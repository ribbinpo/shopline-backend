import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByOne(where: any) {
    try {
      return this.userModel.findOne(where).exec();
    } catch (e) {
      throw new Error(e);
    }
  }
}
