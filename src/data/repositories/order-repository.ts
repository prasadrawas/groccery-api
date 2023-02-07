import { autoInjectable } from 'tsyringe';
import NotFoundException from '../../common/exceptions/NotFoundException';
import ValidationException from '../../common/exceptions/ValidationException';
import IOrderRepository from '../../domain/interfaces/order-interface';
import Order from '../../domain/models/order-model';
import OrderValidator from '../../domain/validators/order-validator';

@autoInjectable()
class OrderRepository implements IOrderRepository {
  public async getAllOrdersByUid(userId: string): Promise<any> {
    const order = Order.find({ userId: userId });
    if (!order)
      throw new NotFoundException('Order list not found for the user');
    return order;
  }
  public async getOrderById(id: string): Promise<any> {
    const order = Order.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  public async createOrder(data: Object): Promise<any> {
    const { error } = OrderValidator.validate(data);
    if (error) {
      throw new ValidationException(error.details[0].message);
    }
    return await new Order(data).save();
  }
  public async deleteOrderById(id: string): Promise<any> {
    const order = Order.findByIdAndDelete(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
  public async updateOrderById(id: string, data: Object): Promise<any> {
    const order = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}

export default OrderRepository;
