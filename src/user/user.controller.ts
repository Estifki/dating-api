import { Controller, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/all')
  async allUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('/all')
  async removeAll() {
    return this.userService.deleteAllUsers();
  }
}
