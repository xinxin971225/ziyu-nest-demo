import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    /** 注入时是字符串的话需要 @Inject('app_service') 手动指定 */ private readonly appService: AppService,
    @Inject('person1') private readonly person1: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string },
    @Inject('person3') private readonly person3: { name: string; desc: string },
  ) {}

  // 非构造器注入
  // @Inject(AppService)
  // private readonly appService: AppService;

  @Get()
  getHello(): string {
    this.person1;
    this.person2;
    this.person3;
    return this.appService.getHello();
  }
}
