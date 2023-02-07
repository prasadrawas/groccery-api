import NotFoundException from '../../common/exceptions/NotFoundException';
import BaseRepository from '../../domain/interfaces/base-interface';
import Review from '../../domain/models/review-model';

class ReviewsRepository implements BaseRepository {
  public async getAll(id: string): Promise<any> {
    const review = await Review.find({ product: id });
    if (!review)
      throw new NotFoundException('Reviews not found for this product');
    return review;
  }
  public async get(id: string): Promise<any> {
    const review = await Review.findById(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
  public async add(data: Object): Promise<any> {
    return await new Review(data).save();
  }
  public async delete(id: string): Promise<any> {
    const review = await Review.findByIdAndDelete(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
  public async update(id: string, data: Object): Promise<any> {
    const review = await Review.findByIdAndUpdate(id, data);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }
}

export default ReviewsRepository;
