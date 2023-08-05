import { Controller, Get, Param } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get(':id')
  async getMyMatchs(@Param("id") id: string) {
    return this.matchService.possibleMatchs(id);
  }
}
