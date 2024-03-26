import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/database/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  findAll() {
    try {
      return this.productModel.find().exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  findOne(id: number) {
    try {
      return this.productModel.findById(id).exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.productModel
        .findByIdAndUpdate({ _id: id }, updateProductDto, { upsert: true })
        .exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  remove(id: number) {
    try {
      return this.productModel.findByIdAndDelete({ _id: id }).exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  addCategory(productId: string, categoryId: string[]) {
    try {
      return this.productModel
        .findByIdAndUpdate(
          { _id: productId },
          { $push: { category: { $each: categoryId } } },
          { new: true },
        )
        .exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  removeCategory(productId: string, categoryId: string[]) {
    try {
      return this.productModel
        .findByIdAndUpdate(
          { _id: productId },
          { $pull: { category: { $in: categoryId } } },
          { new: true },
        )
        .exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }
}
