import { Response } from 'express';
import NotFoundException from '../exceptions/NotFoundException';
import ImageNotFoundException from '../exceptions/ImageNotFoundException';
import ValidationException from '../exceptions/ValidationException';
import { SendErrorResponse, SendSuccessResponse } from './responses';

export const handleRequest = async (
  promise: Promise<any>,
  response: Response,
  successMessage?: string
): Promise<any> => {
  try {
    const result = await promise;
    return response
      .status(200)
      .send(SendSuccessResponse(result, successMessage));
  } catch (error: any) {
    switch (true) {
      case error instanceof NotFoundException:
        return response.status(404).send(SendErrorResponse(`${error.message}`));
      case error instanceof ImageNotFoundException:
        return response.status(422).send(SendErrorResponse(`${error.message}`));
      case error instanceof ValidationException:
        return response.status(422).send(SendErrorResponse(`${error.message}`));
      default:
        return response.status(501).send(SendErrorResponse(`Error: ${error}`));
    }
  }
};
