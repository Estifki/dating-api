import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/schema/user.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: userSchema,
      },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
