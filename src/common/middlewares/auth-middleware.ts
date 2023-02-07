import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SendErrorResponse } from '../helpers/responses';
require('dotenv').config();

const auth = (request: any, response: Response, next: NextFunction) => {
  next();
  return;
  const token = request.header('x-token');

  if (!token)
    return response
      .status(401)
      .send(SendErrorResponse('Authorization token required'));

  try {
    const payload = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`);
    request.payload = payload;
    next();
  } catch (e) {
    return response
      .status(403)
      .send(SendErrorResponse('Invalid authorization token'));
  }
};

export default auth;
