import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import auth from '../../common/middlewares/auth-middleware';
import objectid from '../../common/middlewares/objectid-middleware.ts';
import OrdersController from '../../data/controllers/orders-controller';
//Creating Router instance
const ordersRouter: Router = express.Router();

//Creating controller instance
const controller: OrdersController = container.resolve(OrdersController);

//GET: Get all orderes of specific user
ordersRouter.get('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  await controller.getAllOrdersByUid(_id, response);
});

//GET: Get orderes by orderId
ordersRouter.get(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getOrderById(request.params.id, response);
  }
);

//POST: Add new order
ordersRouter.post('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  const data = request.body;
  data.userId = _id;
  await controller.createOrder(data, response);
});

//PUT: Update order into database
ordersRouter.put(
  '/:id',
  auth,
  objectid,
  async (request: any, response: Response) => {
    const { _id } = request.payload;
    const id = request.params.id;
    const data = request.body;
    data.userId = _id;
    await controller.updateOrderById(id, data, response);
  }
);

//DELETE: Delete a specific order
ordersRouter.delete(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    const id = request.params.id;
    await controller.deleteOrderById(id, response);
  }
);

export default ordersRouter;
