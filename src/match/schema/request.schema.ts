import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.shema';

@Schema({ timestamps: true })
export class MatchRequest {
  @Prop()
  sender: string;

  @Prop()
  receiver: string;
}

export const matchRequestSchema = SchemaFactory.createForClass(MatchRequest);
