import { Injectable } from '@nestjs/common';

import { GREETING } from './constants';

@Injectable()
export class AppService {
  getHello() {
    return GREETING;
  }
}
