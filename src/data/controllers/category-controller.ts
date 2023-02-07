import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import CategoryRepository from '../repositories/category-repository';

@autoInjectable()
class CategoryController {
  private readonly _repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this._repository = repository;
  }

  public async getAllCategories(response: Response): Promise<any> {
    return handleRequest(this._repository.getAllCategories(), response);
  }

  public async getCategoryById(id: string, response: Response): Promise<any> {
    return handleRequest(this._repository.getCategoryById(id), response);
  }

  public async createCategory(
    data: Object,
    file: any,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.createCategory(data, file),
      response,
      'Category created successfully.'
    );
  }

  public async deleteCategoryById(
    id: string,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.deleteCategoryById(id),
      response,
      'Category deleted successfully.'
    );
  }

  public async updateCategoryById(
    id: string,
    data: Object,
    image: any,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.updateCategoryById(id, data, image),
      response,
      'Category updated successfully.'
    );
  }
}

export default CategoryController;
