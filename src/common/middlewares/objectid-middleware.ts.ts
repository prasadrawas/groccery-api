import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { invalidObjectId } from '../helpers/responses';

const objectid = (request: Request, response: Response, next: NextFunction) => {
  const id = request.params.id;
  if (!isValidObjectId(id)) {
    return response.status(400).send(invalidObjectId);
  }
  next();
};

export default objectid;
