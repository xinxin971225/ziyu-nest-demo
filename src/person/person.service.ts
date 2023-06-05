import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('onApiPersonServiceModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onApiPersonServiceApplicationBootstrap');
  }
  onApplicationShutdown(signal?: string) {
    console.log('PersonService - onApplicationShutdown', signal);
  }
  onModuleDestroy() {
    console.log('onModuleDestroy - PersonService');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('PersonService - beforeApplicationShutdown', signal);
  }
  create(createPersonDto: CreatePersonDto) {
    return `This action adds a new person received: ${JSON.stringify(
      createPersonDto,
    )}`;
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
