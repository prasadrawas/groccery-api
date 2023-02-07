import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { autoInjectable } from 'tsyringe';
import {
  SendErrorResponse,
  SendSuccessResponse,
  serverErrorResponse,
  validationErrorResponse,
} from '../../common/helpers/responses';
import {
  userLoginValidator,
  UserRegistrationValidator,
} from '../../domain/validators/user-validator';
import AuthRepository from '../repositories/auth-repository';

require('dotenv').config();
@autoInjectable()
class AuthController {
  private readonly _repository: AuthRepository;
  private readonly _salt: number;

  constructor(repository: AuthRepository) {
    this._repository = repository;
    this._salt = 10;
  }

  public async login(
    email: string,
    password: string,
    response: Response
  ): Promise<any> {
    //creating login details object
    const data = { email: email, password: password };

    //validate login details
    const { error } = userLoginValidator.validate(data);

    if (error) {
      return response.status(422).send({
        message: error.details[0].message,
      });
    }

    try {
      const user = await this._repository.login(data.email);
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          //Generating json web token
          const token = this._generateAuthToken(user);

          //Deleting password fields
          user.password = undefined;

          return response
            .header('x-token', token)
            .status(200)
            .send(SendSuccessResponse(user, 'User logged in successfully.'));
        } else {
          return response
            .status(401)
            .send(SendErrorResponse('email or password is incorrect'));
        }
      } else {
        return response
          .status(401)
          .send(SendErrorResponse('email or password is incorrect'));
      }
    } catch (error) {
      return response.status(500).send(serverErrorResponse(error));
    }
  }

  public async register(
    name: string,
    email: string,
    phone: string,
    password: string,
    response: Response
  ): Promise<any> {
    //encrypting password
    password = await bcrypt.hash(password, this._salt);

    //creating registration object
    const data: Object = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    //validate registration details
    const { error } = UserRegistrationValidator.validate(data);

    if (error) {
      return response
        .status(422)
        .send(validationErrorResponse(error.details[0].message));
    }

    try {
      const user = await this._repository.register(data);

      if (!user) {
        return response
          .status(401)
          .send(SendErrorResponse('Email already in use.'));
      }

      //Generating json web token
      const token = this._generateAuthToken(user);

      //Deleting password fields
      user.password = undefined;

      return response
        .header('x-token', token)
        .status(200)
        .send(SendSuccessResponse(user, 'User registered successfully.'));
    } catch (error) {
      return response.status(500).send(serverErrorResponse(error));
    }
  }

  private _generateAuthToken(user: any) {
    const payload = {
      _id: user._id,
      userType: user.userType,
    };
    const token = jwt.sign(payload, `${process.env.JWT_PRIVATE_KEY}`);
    return token;
  }
}

export default AuthController;
