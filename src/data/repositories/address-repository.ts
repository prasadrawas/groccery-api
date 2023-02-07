import { autoInjectable } from 'tsyringe';
import NotFoundException from '../../common/exceptions/NotFoundException';
import ValidationException from '../../common/exceptions/ValidationException';
import IAddressRepository from '../../domain/interfaces/address-interface';
import Address from '../../domain/models/address-model';
import AddressValidator from '../../domain/validators/address-validator';

@autoInjectable()
class AddressRepository implements IAddressRepository {
  public async getAllAddressesByUid(userId: string): Promise<any> {
    const address = await Address.find({ userId: userId });
    if (!address)
      throw new NotFoundException('No address list found for the user');
    return address;
  }
  public async getAddressById(addressId: string): Promise<any> {
    const address = await Address.findById(addressId);
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }
  public async createAddress(data: Object): Promise<any> {
    const { error } = AddressValidator.validate(data);
    if (error) {
      throw new ValidationException(error.details[0].message);
    }
    return await new Address(data).save();
  }
  public async deleteAddressById(addressId: string): Promise<any> {
    const address = await Address.findByIdAndDelete(addressId);
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }
  public async updateAddressById(
    addressId: string,
    data: Object
  ): Promise<any> {
    const address = await Address.findByIdAndUpdate(addressId, data, {
      new: true,
    });
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }
}

export default AddressRepository;
