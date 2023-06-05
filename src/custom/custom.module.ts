import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { CustomService } from './custom.service';
import { CustomController } from './custom.controller';
// import { PersonModule } from 'src/person/person.module';

@Module({
  // imports: [PersonModule],
  controllers: [CustomController],
  providers: [CustomService],
})
export class CustomModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('onCustomModuleModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onCustomModuleApplicationBootstrap');
  }
}
