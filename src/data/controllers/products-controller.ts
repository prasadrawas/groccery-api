import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import ProductRepository from '../repositories/product-repository';

@autoInjectable()
class ProductController {
  private readonly _repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this._repository = repository;
  }

  public async getAllProducts(response: Response): Promise<any> {
    return handleRequest(this._repository.getAllProducts(), response);
  }

  public async getHotProducts(response: Response): Promise<any> {
    return handleRequest(this._repository.getHotProducts(), response);
  }

  public async getProductById(id: string, response: Response): Promise<any> {
    return handleRequest(this._repository.getProductById(id), response);
  }

  public async updateProductById(
    id: string,
    data: any,
    file: any,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.updateProductById(id, data, file),
      response,
      'Product updated successfully.'
    );
  }

  public async createProduct(
    data: any,
    file: any,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.createProduct(data, file),
      response,
      'Product created successfully.'
    );
  }

  public async deleteProductById(id: string, response: Response): Promise<any> {
    return handleRequest(
      this._repository.deleteProductById(id),
      response,
      'Product deleted successfully.'
    );
  }

  public async getProductsByCategoryId(
    id: string,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.getProductsByCategoryId(id),
      response
    );
  }
}

export default ProductController;
