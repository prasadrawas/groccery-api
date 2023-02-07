import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import OrderRepository from '../repositories/order-repository';

@autoInjectable()
class OrdersController {
  private readonly _repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this._repository = repository;
  }

  public async getAllOrdersByUid(
    userId: string,
    response: Response
  ): Promise<any> {
    return handleRequest(this._repository.getAllOrdersByUid(userId), response);
  }

  public async getOrderById(id: string, response: Response): Promise<any> {
    return handleRequest(this._repository.getOrderById(id), response);
  }

  public async createOrder(data: Object, response: Response): Promise<any> {
    return handleRequest(
      this._repository.createOrder(data),
      response,
      'Order created successfully.'
    );
  }

  public async deleteOrderById(id: string, response: Response): Promise<any> {
    return handleRequest(
      this._repository.deleteOrderById(id),
      response,
      'Order deleted successfully.'
    );
  }

  public async updateOrderById(
    id: string,
    data: Object,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.updateOrderById(id, data),
      response,
      'Order updated successfully.'
    );
  }
}

export default OrdersController;
