import express, { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import auth from '../../common/middlewares/auth-middleware';
import objectid from '../../common/middlewares/objectid-middleware.ts';
import AddressController from '../../data/controllers/address-controller';
//Creating Router instance
const addressRouter: Router = express.Router();

//Creating controller instance
const controller: AddressController = container.resolve(AddressController);

//GET: Get all addresses of specific user
addressRouter.get('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  await controller.getAllAddressesByUid(_id, response);
});

//GET: Get addresses by addressId
addressRouter.get(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    await controller.getAddressById(request.params.id, response);
  }
);

//POST: Add new address
addressRouter.post('/', auth, async (request: any, response: Response) => {
  const { _id } = request.payload;
  const data = request.body;
  data.userId = _id;
  await controller.createAddress(data, response);
});

//PUT: Update address into database
addressRouter.put(
  '/:id',
  auth,
  objectid,
  async (request: any, response: Response) => {
    const { _id } = request.payload;
    const id = request.params.id;
    const data = request.body;
    data.userId = _id;
    await controller.updateAddressById(id, data, response);
  }
);

//DELETE: Delete a specific address
addressRouter.delete(
  '/:id',
  auth,
  objectid,
  async (request: Request, response: Response) => {
    const id = request.params.id;
    await controller.deleteAddressById(id, response);
  }
);

export default addressRouter;
