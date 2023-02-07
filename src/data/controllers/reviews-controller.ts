import { Response } from 'express';
import { autoInjectable } from 'tsyringe';
import { handleRequest } from '../../common/helpers/request-handler';
import ReviewsRepository from '../repositories/reviews-repository';

@autoInjectable()
class ReviewsController {
  private readonly _repository: ReviewsRepository;
  constructor(repository: ReviewsRepository) {
    this._repository = repository;
  }

  public async get(id: string, response: Response): Promise<any> {
    return handleRequest(this._repository.get(id), response);
  }

  public async add(data: Object, response: Response): Promise<any> {
    return handleRequest(
      this._repository.add(data),
      response,
      'Review created succesfully.'
    );
  }

  public async update(
    id: string,
    data: Object,
    response: Response
  ): Promise<any> {
    return handleRequest(
      this._repository.update(id, data),
      response,
      'Review updated succesfully.'
    );
  }

  public async delete(id: string, response: Response): Promise<any> {
    return handleRequest(
      this._repository.delete(id),
      response,
      'Review deleted succesfully.'
    );
  }
}

export default ReviewsController;
