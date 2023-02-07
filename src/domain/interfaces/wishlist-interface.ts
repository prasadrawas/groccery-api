interface IWishlistRepository {
  getAllWishlistItemsByUid(userId: string): Promise<any>;
  getWishlistItemById(id: string): Promise<any>;
  createWishlistItem(data: Object): Promise<any>;
  deleteWishlistItemById(id: string): Promise<any>;
}

export default IWishlistRepository;
