import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ isRequired: true, unique: true })
  username: string;

  @Prop({ isRequired: true })
  firstname: string;

  @Prop({ isRequired: true })
  lastname: string;

  @Prop({ isRequired: true })
  dob: Date;

  @Prop({ isRequired: true })
  bio: string;

  @Prop({ required: true, type: [String] })
  hobbies: string[];

  @Prop()
  profilepic: string;
}

export const userSchema = SchemaFactory.createForClass(User);
