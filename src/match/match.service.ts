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
    const validMoogosReceiverId = mongoose.isValidObjectId(receiverId);
    if (!validMoogosReceiverId) {
      throw new BadRequestException('Receiver ID is not correct');
    }

    // Retrieve the full userInfo of the sender
    const sender = await this.userModel.findById(senderId);

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

    // Create and save the match request
    const matchRequest = await this.matchRequestModel.create({
      sender: senderId,
      receiver: receiverId, // Use the actual receiverId, not the receiver document
    });

    return { message: 'Match Request Sent Successfully', data: matchRequest };
  }

  async getMatchRequests(userId: string) {
    const validMoogosId = mongoose.isValidObjectId(userId);
    if (!validMoogosId) {
      throw new BadRequestException('UserId is not correct');
    }

    // Find all match requests that match the receiverId and userId,
    // and populate the 'sender' field with sender information
    const matchRequests = await this.matchRequestModel
      .find({ receiverId: userId })
      .populate('sender') // Specify the field to populate
      .exec();

    if (matchRequests.length === 0) {
      return {
        message: 'You Have No Match Request',
      };
    }

    return matchRequests;
  }
}
