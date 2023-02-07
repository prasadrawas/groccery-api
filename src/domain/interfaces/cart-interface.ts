interface ICartRepository {
  getAllCartItemsByUid(userId: string): Promise<any>;
  getCartItemById(cartId: string): Promise<any>;
  createCartItem(data: Object): Promise<any>;
  deleteCartItemById(cartId: string): Promise<any>;
  updateCartItemById(cartId: string, data: Object): Promise<any>;
}

export default ICartRepository;
