import { Cloudinary } from '../../common/cloudinary/Cloudinary';
import ImageNotFoundException from '../../common/exceptions/ImageNotFoundException';
import NotFoundException from '../../common/exceptions/NotFoundException';
import ValidationException from '../../common/exceptions/ValidationException';
import ICategoryRepository from '../../domain/interfaces/category-interface';
import Category from '../../domain/models/category-model';
import CategoryValidator from '../../domain/validators/category-validator';

class CategoryRepository implements ICategoryRepository {
  public async getAllCategories(): Promise<any> {
    const category = await Category.find();
    if (!category) throw new NotFoundException('Category list not found');
    return category;
  }
  public async getCategoryById(id: string): Promise<any> {
    const category = await Category.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
  public async createCategory(data: any, file: any): Promise<any> {
    const result: any = await Cloudinary.instance.uploadImage(file?.path || '');

    if (result.status === 200) {
      data.image = result.url;
      const { error } = CategoryValidator.validate(data);
      if (error) {
        throw new ValidationException(error.details[0].message);
      }
      const category = new Category(data);
      return await category.save();
    } else {
      throw new ImageNotFoundException(result.message);
    }
  }
  public async deleteCategoryById(id: string): Promise<any> {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
  public async updateCategoryById(
    id: string,
    data: any,
    image: any
  ): Promise<any> {
    //finding category
    const result = await Category.findById(id);
    if (!result) {
      throw new NotFoundException('Category not found');
    }

    if (!image) {
      data.image = result.image;
      const { error } = CategoryValidator.validate(data);
      if (error) {
        throw new ValidationException(error.details[0].message);
      }
      return await Category.findByIdAndUpdate(id, data, {
        new: true,
      });
    } else {
      //Uploading image to cloudinary
      const result: any = await Cloudinary.instance.uploadImage(
        image?.path || ''
      );
      if (result.status === 200) {
        data.image = result.url;
        const { error } = CategoryValidator.validate(data);
        if (error) {
          throw new ValidationException(error.details[0].message);
        }
        return await Category.findByIdAndUpdate(id, data, {
          new: true,
        });
      } else {
        throw new ImageNotFoundException(result.message);
      }
    }
  }
}

export default CategoryRepository;
