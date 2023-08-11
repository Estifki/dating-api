import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('/possibleMatch/:id')
  async getMyMatchs(@Param('id') id: string) {
    return this.matchService.possibleMatchs(id);
  }
  @Post()
  async sendMatchRequest(
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
  ) {
    return this.matchService.sendMatchRequest(senderId, receiverId);
  }
  @Get('/matchRequest/:id')
  async getMatchRequest(@Param('id') id: string) {
    return this.matchService.getMatchRequests(id);
  }

}
