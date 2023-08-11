import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/schema/user.shema';
import { matchRequestSchema } from './schema/request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: userSchema,
      },
    ]),

    MongooseModule.forFeature([
      {
        name: 'MatchRequest',
        schema: matchRequestSchema,
      },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
