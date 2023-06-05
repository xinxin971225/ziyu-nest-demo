import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { CustomService } from './custom.service';
import { PersonService } from 'src/person/person.service';
import { CreateCustomDto } from './dto/create-custom.dto';
import { UpdateCustomDto } from './dto/update-custom.dto';

@Controller('custom')
export class CustomController implements OnModuleInit, OnApplicationBootstrap {
  constructor(
    private readonly customService: CustomService,
    private readonly PersonService: PersonService,
  ) {}

  onModuleInit() {
    console.log('onCustomControllerModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onCustomControllerApplicationBootstrap');
  }
  @Post()
  create(@Body() createCustomDto: CreateCustomDto) {
    return this.customService.create(createCustomDto);
  }

  @Get()
  findAll() {
    return this.customService.findAll() + this.PersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomDto: UpdateCustomDto) {
    return this.customService.update(+id, updateCustomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customService.remove(+id);
  }
}
