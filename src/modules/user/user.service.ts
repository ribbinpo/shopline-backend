import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }
}
