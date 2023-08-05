import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsDate, IsEmpty, IsString } from 'class-validator';
import { type } from 'os';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ isRequired: true, unique: true })
  @IsEmpty()
  @IsString()
  username: string;

  @Prop({ isRequired: true })
  @IsEmpty()
  @IsString()
  firstname: string;

  @Prop({ isRequired: true })
  @IsEmpty()
  @IsString()
  lastname: string;

  @Prop({ isRequired: true })
  @IsEmpty()
  @IsDate()
  dob: Date;

  @Prop({ isRequired: true })
  @IsEmpty()
  @IsString()
  bio: string;

  @Prop({ required: true, type: [String] })
  @IsEmpty()
  @IsArray()
  hobbies: string[];

  @Prop()
  @IsString()
  profilepic: string;
}

export const userSchema = SchemaFactory.createForClass(User);
