import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import auth from '../../common/middlewares/auth-middleware';
import objectid from '../../common/middlewares/objectid-middleware.ts';
import WishlistController from '../../data/controllers/wishlist-controller';
//Creating Router instance
const wishlistRouter: Router = express.Router();

//Creating controller instance
const controller: WishlistController = container.resolve(WishlistController);

//GET: Get all wishlist items of specific user
wishlistRouter.get('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  await controller.getAllWishlistItemsByUid(_id, response);
});

//GET: Get wishlist items by wishlist itemId
wishlistRouter.get(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getWishlistItemById(request.params.id, response);
  }
);

//POST: Add new wishlist item
wishlistRouter.post('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  const data = request.body;
  data.userId = _id;
  await controller.createWishlistItem(data, response);
});

//DELETE: Delete a specific wishlist item
wishlistRouter.delete(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    const id = request.params.id;
    await controller.deleteWishlistItemById(id, response);
  }
);

export default wishlistRouter;
