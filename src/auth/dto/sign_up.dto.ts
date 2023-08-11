import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/utils/emuns/gender.enum';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsArray()
  hobbies: string[];
  // @IsNotEmpty()
  // @IsArray()
  // images: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
