import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import auth from '../../common/middlewares/auth-middleware';
import objectid from '../../common/middlewares/objectid-middleware.ts';
import CartController from '../../data/controllers/cart-controller';
//Creating Router instance
const cartRouter: Router = express.Router();

//Creating controller instance
const controller: CartController = container.resolve(CartController);

//GET: Get all cart items of specific user
cartRouter.get('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  await controller.getAllCartItemsByUid(_id, response);
});

//GET: Get cart item by cartId
cartRouter.get(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getCartItemById(request.params.id, response);
  }
);

//POST: Add new cart item
cartRouter.post('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  const data = request.body;
  data.userId = _id;
  await controller.createCartItem(data, response);
});

//PUT: Update cart item into database
cartRouter.patch(
  '/:id',
  auth,
  objectid,
  async (request: any, response: Response) => {
    const { _id } = request.payload;
    const id = request.params.id;
    const data = request.body;
    data.userId = _id;
    await controller.updateCartItemById(id, data, response);
  }
);

//DELETE: Delete a specific cart item
cartRouter.delete(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    const id = request.params.id;
    await controller.deleteCartItemById(id, response);
  }
);

export default cartRouter;
