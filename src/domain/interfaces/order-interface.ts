interface IOrderRepository {
  getAllOrdersByUid(userId: string): Promise<any>;
  getOrderById(id: string): Promise<any>;
  createOrder(data: Object): Promise<any>;
  deleteOrderById(id: string): Promise<any>;
  updateOrderById(id: string, data: Object): Promise<any>;
}

export default IOrderRepository;
