import {
  BeforeApplicationShutdown,
  Global,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    console.log('onPersonModuleModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onPersonModuleApplicationBootstrap');
  }
  onApplicationShutdown(signal?: string) {
    console.log('PersonModule - onApplicationShutdown', signal);
  }
  onModuleDestroy() {
    console.log('onModuleDestroy - PersonModule');
  }
  beforeApplicationShutdown(signal?: string) {
    const personService = this.moduleRef.get<PersonService>(PersonService);
    console.log('------------', personService.findAll());
    console.log('PersonModule - beforeApplicationShutdown', signal);
  }
}
