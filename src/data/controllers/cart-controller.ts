import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import CartRepository from '../repositories/cart-repository';

@autoInjectable()
class CartController {
  private readonly _repository: CartRepository;

  constructor(repository: CartRepository) {
    this._repository = repository;
  }

  public async getAllCartItemsByUid(
    userId: string,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.getAllCartItemsByUid(userId),
      response
    );
  }

  public async getCartItemById(
    cartId: string,
    response: Response
  ): Promise<any> {
    return handleRequest(this._repository.getCartItemById(cartId), response);
  }

  public async createCartItem(data: Object, response: Response): Promise<any> {
    return handleRequest(
      this._repository.createCartItem(data),
      response,
      'Item added to cart successfully.'
    );
  }

  public async deleteCartItemById(
    cartId: string,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.deleteCartItemById(cartId),
      response,
      'Cart item deleted successfully.'
    );
  }

  public async updateCartItemById(
    cartId: string,
    data: any,
    response: Response
  ): Promise<any> {
    if (data.quantity <= 0) {
      return this.deleteCartItemById(cartId, response);
    } else {
      return handleRequest(
        this._repository.updateCartItemById(cartId, data),
        response,
        'Cart item updated successfully.'
      );
    }
  }
}

export default CartController;
