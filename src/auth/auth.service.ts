import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/user/schema/user.shema';
import { SignUpDto } from './dto/sign_up.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(signUpBody: SignUpDto) {
    const { username } = signUpBody;
    const isNotValidUser = await this.userModel.findOne({ username });
    if (isNotValidUser) {
      throw new ConflictException('UserName Already Exist!');
    }

    const hashedPassword = await bcrypt.hash(signUpBody.password, 10);

    const user = await this.userModel.create({
      ...signUpBody,
      password: hashedPassword,
    });

    const response = {
      message: 'Success',
      user: user,
    };
    return response;
  }

  async login(signInBody) {
    const { username, password } = signInBody;

    const signInUser = await this.userModel.findOne({ username });

    if (!signInUser) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }

    const isPassword = await bcrypt.compare(password, signInUser.password);
    if (!isPassword) {
      throw new UnauthorizedException('Incorrect Email or Password');
    }

    return {
      user: signInUser,
    };
  }
}
