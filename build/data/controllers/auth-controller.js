"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
const responses_1 = require("../../common/helpers/responses");
const user_validator_1 = require("../../domain/validators/user-validator");
const auth_repository_1 = __importDefault(require("../repositories/auth-repository"));
require('dotenv').config();
let AuthController = class AuthController {
    constructor(repository) {
        this._repository = repository;
        this._salt = 10;
    }
    login(email, password, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //creating login details object
            const data = { email: email, password: password };
            //validate login details
            const { error } = user_validator_1.userLoginValidator.validate(data);
            if (error) {
                return response.status(422).send({
                    message: error.details[0].message,
                });
            }
            try {
                const user = yield this._repository.login(data.email);
                if (user) {
                    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                    if (isValidPassword) {
                        //Generating json web token
                        const token = this._generateAuthToken(user);
                        //Deleting password fields
                        user.password = undefined;
                        return response
                            .header('x-token', token)
                            .status(200)
                            .send((0, responses_1.SendSuccessResponse)(user, 'User logged in successfully.'));
                    }
                    else {
                        return response
                            .status(401)
                            .send((0, responses_1.SendErrorResponse)('email or password is incorrect'));
                    }
                }
                else {
                    return response
                        .status(401)
                        .send((0, responses_1.SendErrorResponse)('email or password is incorrect'));
                }
            }
            catch (error) {
                return response.status(500).send((0, responses_1.serverErrorResponse)(error));
            }
        });
    }
    register(name, email, phone, password, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //encrypting password
            password = yield bcrypt_1.default.hash(password, this._salt);
            //creating registration object
            const data = {
                name: name,
                email: email,
                phone: phone,
                password: password,
            };
            //validate registration details
            const { error } = user_validator_1.UserRegistrationValidator.validate(data);
            if (error) {
                return response
                    .status(422)
                    .send((0, responses_1.validationErrorResponse)(error.details[0].message));
            }
            try {
                const user = yield this._repository.register(data);
                if (!user) {
                    return response
                        .status(401)
                        .send((0, responses_1.SendErrorResponse)('Email already in use.'));
                }
                //Generating json web token
                const token = this._generateAuthToken(user);
                //Deleting password fields
                user.password = undefined;
                return response
                    .header('x-token', token)
                    .status(200)
                    .send((0, responses_1.SendSuccessResponse)(user, 'User registered successfully.'));
            }
            catch (error) {
                return response.status(500).send((0, responses_1.serverErrorResponse)(error));
            }
        });
    }
    _generateAuthToken(user) {
        const payload = {
            _id: user._id,
            userType: user.userType,
        };
        const token = jsonwebtoken_1.default.sign(payload, `${process.env.JWT_PRIVATE_KEY}`);
        return token;
    }
};
AuthController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [auth_repository_1.default])
], AuthController);
exports.default = AuthController;
