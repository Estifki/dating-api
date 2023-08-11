import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.shema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getAllUsers() {
    const users = await this.userModel.find();

    if (users.length === 0) {
      return {
        message: 'User table is empty',
      };
    }

    return users;
  }

  async deleteAllUsers() {
    await this.userModel.deleteMany();
    return {
      message: 'All Users Deleted',
      users: await this.userModel.find(),
    };
  }
}
