import NotFoundException from '../../common/exceptions/NotFoundException';
import ValidationException from '../../common/exceptions/ValidationException';
import ICartRepository from '../../domain/interfaces/cart-interface';
import Cart from '../../domain/models/cart-model';
import CartValidator from '../../domain/validators/cart-validator';

class CartRepository implements ICartRepository {
  public async getAllCartItemsByUid(userId: string): Promise<any> {
    const cart = await Cart.find({ userId: userId }).populate('product');
    if (!cart) throw new NotFoundException('No cart found for the user');
    return cart;
  }
  public async getCartItemById(cartId: string): Promise<any> {
    const cart = await Cart.findById(cartId).populate('product');
    if (!cart) throw new NotFoundException('Cart item not found');
    return cart;
  }
  public async createCartItem(data: any): Promise<any> {
    const { error } = CartValidator.validate(data);
    if (error) {
      throw new ValidationException(error.details[0].message);
    }

    return (await new Cart(data).save()).populate('product');
  }

  public async deleteCartItemById(cartId: string): Promise<any> {
    const cart = await Cart.findByIdAndDelete(cartId).populate('product');
    if (!cart) throw new NotFoundException('Cart item not found');
    return cart;
  }

  public async updateCartItemById(cartId: string, data: Object): Promise<any> {
    const cart = await Cart.findByIdAndUpdate(cartId, data, {
      new: true,
    }).populate('product');
    if (!cart) throw new NotFoundException('Cart item not found');
    return cart;
  }
}

export default CartRepository;
