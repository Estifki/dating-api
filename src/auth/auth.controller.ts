import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign_up.dto';
import { SignInDto } from './dto/sign_in.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

const imageVideoFileRegex = /\.(jpg|jpeg|png|webp)$/i;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
  async signUp(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
    },
    @Body() signUpBody: SignUpDto,
  ) {
    const { images } = files;
    if (images == null) {
      throw new HttpException(
        'There Should Be Minimum One Image',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      for (const image of images) {
        // Check if the file is an image (jpg, jpeg, png, or webp)
        if (!image.originalname?.match(imageVideoFileRegex)) {
          throw new HttpException(
            'Invalid image file type.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
    return this.authService.createUser(signUpBody, images);
  }

  @Get('/signin')
  async signIn(@Body() signInBody: SignInDto) {
    return this.authService.login(signInBody);
  }
}
