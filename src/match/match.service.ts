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
    @InjectModel('MatchRequest')
    private matchRequestModel: Model<User>,
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

  async sendMatchRequest(senderId: string, receiverId: string) {
    const validMoogosSenderId = mongoose.isValidObjectId(senderId);
    if (!validMoogosSenderId) {
      throw new BadRequestException('Sender ID is not correct');
    }
    const validMoogosreceiverId = mongoose.isValidObjectId(receiverId);
    if (!validMoogosreceiverId) {
      throw new BadRequestException('Receiver ID is not correct');
    }

    // Retrieve the full userInfo of the sender
    const sender = await this.userModel.findById(senderId).exec();
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    // Retrieve only the id of the receiver
    const receiver = await this.userModel
      .findById(receiverId)
      .select('_id')
      .exec();
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    const matchRequest = this.matchRequestModel.create({
      ...sender,
      receiverId: receiver,
    });
    return { message: 'Match Request Sent Sucessfully', data: matchRequest };
  }
}
