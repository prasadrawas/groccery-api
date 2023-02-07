import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import AddressRepository from '../repositories/address-repository';

@autoInjectable()
class AddressController {
  private readonly _repository: AddressRepository;

  constructor(repository: AddressRepository) {
    this._repository = repository;
  }

  public async getAllAddressesByUid(
    userId: string,
    response: Response
  ): Promise<any> {
    return await handleRequest(
      this._repository.getAllAddressesByUid(userId),
      response
    );
  }

  public async getAddressById(
    addressId: string,
    response: Response
  ): Promise<any> {
    return await handleRequest(
      this._repository.getAddressById(addressId),
      response
    );
  }

  public async createAddress(data: Object, response: Response): Promise<any> {
    return await handleRequest(
      this._repository.createAddress(data),
      response,
      'Address created successfully.'
    );
  }

  public async deleteAddressById(
    addressId: string,
    response: Response
  ): Promise<any> {
    return await handleRequest(
      this._repository.deleteAddressById(addressId),
      response,
      'Address deleted successfully.'
    );
  }

  public async updateAddressById(
    addressId: string,
    data: Object,
    response: Response
  ): Promise<any> {
    return await handleRequest(
      this._repository.updateAddressById(addressId, data),
      response,
      'Address updated successfully.'
    );
  }
}

export default AddressController;
