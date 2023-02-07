interface IAddressRepository {
  getAllAddressesByUid(userId: string): Promise<any>;
  getAddressById(addressId: string): Promise<any>;
  createAddress(data: Object): Promise<any>;
  deleteAddressById(addressId: string): Promise<any>;
  updateAddressById(addressId: string, data: Object): Promise<any>;
}

export default IAddressRepository;
