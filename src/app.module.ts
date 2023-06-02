import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [
    // AppService,  简写
    {
      provide: AppService, // 可以是字符串
      useClass: AppService,
    }, //完整写法
    {
      provide: 'person1',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
      // useExisting 设置别名
    },
    {
      provide: 'person3',
      // 支持异步
      useFactory(person1: { name: string }, appService: AppService) {
        return {
          name: person1.name,
          desc: appService.getHello(),
        };
      },
      inject: ['person1', AppService],
    },
  ],
})
export class AppModule {}
