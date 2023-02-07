import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import auth from '../../common/middlewares/auth-middleware';
import upload from '../../common/middlewares/image-middleware';
import objectid from '../../common/middlewares/objectid-middleware.ts';
import CategoryController from '../../data/controllers/category-controller';

//Creating Router instance
const categoryRouter: Router = express.Router();

//Creating controller instance
const controller: CategoryController = container.resolve(CategoryController);

//GET: Get all categoryes of specific user
categoryRouter.get('/', auth, async (_request: any, response: Response) => {
  await controller.getAllCategories(response);
});

//GET: Get categoryes by categoryId
categoryRouter.get(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getCategoryById(request.params.id, response);
  }
);

//POST: Add new category
categoryRouter.post(
  '/',
  auth,
  upload.single('image'),
  async (request: any, response: Response) => {
    const payload = request.body;
    const image = request.file;
    await controller.createCategory(payload, image, response);
  }
);

//PUT: Update category into database
categoryRouter.put(
  '/:id',
  auth,
  objectid,
  upload.single('image'),
  async (request: any, response: Response) => {
    const id = request.params.id;
    const data = request.body;
    const image = request.file;
    await controller.updateCategoryById(id, data, image, response);
  }
);

//DELETE: Delete a specific category
categoryRouter.delete(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    const id = request.params.id;
    await controller.deleteCategoryById(id, response);
  }
);

export default categoryRouter;
