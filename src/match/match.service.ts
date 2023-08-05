import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schema/user.shema';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async possibleMatchs(userId: string) {
    const validMoogosId = mongoose.isValidObjectId(userId);

    if (!validMoogosId) {
      throw new BadRequestException('UserId is not correct');
    }
    const currentUser = await this.userModel.findById(userId).exec();

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    let matchGender = 'Female';

    if (currentUser.gender === 'Female') {
      matchGender = 'Male';
    }
    const matchingUsers = await this.userModel
      .find({
        id: { $ne: currentUser._id }, // Exclude the current user
        gender: matchGender, // Match users with opposite gender
        hobbies: {
          $exists: true,
          $not: { $size: 0 },
          $in: currentUser.hobbies,
        }, // Match users with at least one common hobby
      })
      .exec();

    return matchingUsers;
  }
}
