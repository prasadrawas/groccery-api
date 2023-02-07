import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import ReviewsController from '../../data/controllers/reviews-controller';

//Creating Router instance
const addressRouter: Router = express.Router();

//Creating controller instance
const controller: ReviewsController = container.resolve(ReviewsController);

//GET: Get a review by review id
addressRouter.get('/:id', async (request: Request, response: Response) => {
  await controller.get(request.params.id, response);
});

//POST: Add new address
addressRouter.post('/', async (request: Request, response: Response) => {
  const data = request.body;
  await controller.add(data, response);
});

//PUT: Update address into database
addressRouter.put('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  const data = request.body;
  await controller.update(id, data, response);
});

//DELETE: Delete a specific address
addressRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  await controller.delete(id, response);
});

export default addressRouter;
