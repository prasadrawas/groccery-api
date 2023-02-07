import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import WishlistRepository from '../repositories/wishlist-repository';

@autoInjectable()
class WishlistController {
  private readonly _repository: WishlistRepository;

  constructor(repository: WishlistRepository) {
    this._repository = repository;
  }

  public async getAllWishlistItemsByUid(
    userId: string,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.getAllWishlistItemsByUid(userId),
      response
    );
  }

  public async getWishlistItemById(
    id: string,
    response: Response
  ): Promise<any> {
    return handleRequest(this._repository.getWishlistItemById(id), response);
  }

  public async createWishlistItem(
    data: Object,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.createWishlistItem(data),
      response,
      'Item added to wishlist successfully.'
    );
  }

  public async deleteWishlistItemById(
    id: string,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.deleteWishlistItemById(id),
      response,
      'Wishlist item deleted successfully.'
    );
  }
}

export default WishlistController;
