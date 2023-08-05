import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Gender } from 'src/utils/emuns/gender.enum';

// export type UserDocument = HydratedDocument<User>

@Schema({
  timestamps: true,
})
export class User extends Document {
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

  @Prop({required:true})
  gender: Gender;

  @Prop({ required: true, type: [String] })
  hobbies: string[];

  @Prop()
  profilepic: string;

  @Prop({ isRequired: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
