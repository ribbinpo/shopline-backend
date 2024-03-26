import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/database/schemas/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);
      return createdCategory.save();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  findAll() {
    try {
      return this.categoryModel.find().exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  findOne(id: number) {
    try {
      return this.categoryModel.findById(id).exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.categoryModel
        .findByIdAndUpdate({ _id: id }, updateCategoryDto)
        .exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }

  remove(id: number) {
    try {
      return this.categoryModel.findByIdAndDelete({ _id: id }).exec();
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  }
}
