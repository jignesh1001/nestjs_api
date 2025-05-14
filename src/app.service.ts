import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello';
  }
  getGreet():string{
    return 'test...';
  }
}
