import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.shema';

@Schema({ timestamps: true })
export class MatchRequest extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;

  @Prop()
  receiverId: string;
}

export const matchRequestSchema = SchemaFactory.createForClass(MatchRequest);