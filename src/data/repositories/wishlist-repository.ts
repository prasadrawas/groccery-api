import NotFoundException from '../../common/exceptions/NotFoundException';
import IWishlistRepository from '../../domain/interfaces/wishlist-interface';
import Wishlist from '../../domain/models/wishlist-model';

class WishlistRepository implements IWishlistRepository {
  public async getAllWishlistItemsByUid(userId: string): Promise<any> {
    const wishlist = await Wishlist.find({ userId: userId }).populate(
      'product'
    );
    if (!wishlist)
      throw new NotFoundException('Wishlist not found for this user');
    return wishlist;
  }
  public async getWishlistItemById(id: string): Promise<any> {
    const wishlist = await Wishlist.findById(id).populate('product');
    if (!wishlist) throw new NotFoundException('Wishlist item not found');
    return wishlist;
  }
  public async createWishlistItem(data: Object): Promise<any> {
    const wishlist = await (
      await new Wishlist(data).save()
    ).populate('product');
    if (!wishlist) throw new NotFoundException('Wishlist item not found');
    return wishlist;
  }
  public async deleteWishlistItemById(id: string): Promise<any> {
    const wishlist = await Wishlist.findByIdAndDelete(id).populate('product');
    if (!wishlist) throw new NotFoundException('Wishlist item not found');
    return wishlist;
  }
}

export default WishlistRepository;
