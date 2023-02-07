import { isValidObjectId } from 'mongoose';
import { autoInjectable } from 'tsyringe';
import { Cloudinary } from '../../common/cloudinary/Cloudinary';
import ImageNotFoundException from '../../common/exceptions/ImageNotFoundException';
import NotFoundException from '../../common/exceptions/NotFoundException';
import ValidationException from '../../common/exceptions/ValidationException';
import IProductRepository from '../../domain/interfaces/product-interface';
import Product from '../../domain/models/product-model';
import ProductValidator from '../../domain/validators/product-validator';

@autoInjectable()
class ProductRepository implements IProductRepository {
  public async getAllProducts(): Promise<any> {
    const product = Product.find();
    if (!product) throw new NotFoundException('product list not found');
    return product;
  }
  public async getProductById(id: string): Promise<any> {
    const product = Product.findById(id);
    if (!product) throw new NotFoundException('product list not found');
    return product;
  }
  public async createProduct(data: any, file: any): Promise<any> {
    const result: any = await Cloudinary.instance.uploadImage(file?.path || '');

    if (result.status === 200) {
      data.image = result.url;
      const { error } = ProductValidator.validate(data);
      if (error) {
        throw new ValidationException(error.details[0].message);
      }
      return new Product(data).save();
    } else {
      throw new ImageNotFoundException(result.message);
    }
  }
  public async updateProductById(
    id: string,
    data: any,
    file: any
  ): Promise<any> {
    //find product
    const product = await Product.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    //validating category id
    if (!isValidObjectId(data.category)) {
      throw new ValidationException('Category ID is not valid');
    }

    if (!file) {
      data.image = product.image;
      const { error } = ProductValidator.validate(data);
      if (error) {
        throw new ValidationException(error.details[0].message);
      }
      return await Product.findByIdAndUpdate(id, data, { new: true });
    } else {
      //uploading image to cloudinary
      const result: any = await Cloudinary.instance.uploadImage(
        file?.path || ''
      );

      if (result.status === 200) {
        data.image = result.url;

        //validating product data
        const { error } = ProductValidator.validate(data);
        if (error) {
          throw new ValidationException(error.details[0].message);
        }

        return await Product.findByIdAndUpdate(id, data, { new: true });
      } else {
        throw new ImageNotFoundException(result.message);
      }
    }
  }
  public async deleteProductById(productId: string): Promise<any> {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new NotFoundException('product not found');
    return product;
  }
  public async getProductsByCategoryId(categoryId: string): Promise<any> {
    const product = await Product.find({ category: categoryId });
    if (!product) throw new NotFoundException('products not found');
    return product;
  }
  public async getHotProducts(): Promise<any> {
    const product = await Product.find().limit(10);
    if (!product) throw new NotFoundException('products not found');
    return product;
  }
}

export default ProductRepository;
