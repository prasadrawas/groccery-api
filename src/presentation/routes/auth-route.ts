import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import AuthController from '../../data/controllers/auth-controller';

//Creating Router instance
const authRouter: Router = express.Router();

//Creating controller instance
const controller: AuthController = container.resolve(AuthController);

//Login to server
authRouter.post('/login', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  await controller.login(email, password, response);
});

//Register to server
authRouter.post('/register', async (request: Request, response: Response) => {
  const { name, email, phone, password } = request.body;
  await controller.register(name, email, phone, password, response);
});

export default authRouter;
