import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import auth from '../../common/middlewares/auth-middleware';
import upload from '../../common/middlewares/image-middleware';
import objectid from '../../common/middlewares/objectid-middleware.ts';
import ProductController from '../../data/controllers/products-controller';

//Creating Router instance
const productRouter: Router = express.Router();

//Creating controller
const controller: ProductController = container.resolve(ProductController);

//GET: Get all products
productRouter.get('/', auth, async (_request: Request, response: Response) => {
  await controller.getAllProducts(response);
});

//GET: Get hot products
productRouter.get(
  '/hot',
  auth,
  async (_request: Request, response: Response) => {
    await controller.getHotProducts(response);
  }
);

//GET: Get product by Product ID
productRouter.get(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getProductById(request.params.id, response);
  }
);

//POST: Add new product
productRouter.post(
  '/',
  auth,
  upload.single('image'),
  async (request: Request, response: Response) => {
    await controller.createProduct(request.body, request.file, response);
  }
);

//PUT: Update a product
productRouter.put(
  '/:id',
  auth,
  objectid,
  upload.single('image'),
  async (request: Request, response: Response) => {
    await controller.updateProductById(
      request.params.id,
      request.body,
      request.file,
      response
    );
  }
);

//DELETE: Delete product by Product ID
productRouter.delete(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.deleteProductById(request.params.id, response);
  }
);

//GET: Get product list by Category ID
productRouter.get(
  '/category/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getProductsByCategoryId(request.params.id, response);
  }
);

export default productRouter;
