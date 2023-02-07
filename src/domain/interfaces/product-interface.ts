interface IProductRepository {
  getAllProducts(): Promise<any>;
  getProductById(productId: string): Promise<any>;
  createProduct(data: Object, file: any): Promise<any>;
  updateProductById(productId: string, data: Object, file: any): Promise<any>;
  deleteProductById(productId: string): Promise<any>;
  getProductsByCategoryId(categoryId: string): Promise<any>;
  getHotProducts(): Promise<any>;
}

export default IProductRepository;
