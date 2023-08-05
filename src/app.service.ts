import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiRunning(): string {
    return 'Api is running!';
  }
}
