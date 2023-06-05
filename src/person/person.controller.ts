import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
// import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/person')
export class PersonController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly personService: PersonService) {}

  onModuleInit() {
    console.log('onPersonControllerModuleInit');
  }
  onApplicationBootstrap() {
    console.log('onPersonControllerApplicationBootstrap');
  }
  onApplicationShutdown(signal?: string) {
    console.log('PersonController - onApplicationShutdown', signal);
  }
  onModuleDestroy() {
    console.log('onModuleDestroy - PersonController');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('PersonController - beforeApplicationShutdown', signal);
  }
  //HTTP数据传输方式 form urlencoded /  json
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }
  //HTTP数据传输方式 form data
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return this.personService.create(createPersonDto);
  }

  // @Get()
  // findAll() {
  //   return this.personService.findAll();
  // }

  // HTTP数据传输方式：query
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  // HTTP数据传输方式：urlParams
  @Get(':id')
  urlParam(@Param('id') id: string) {
    // return `received: id=${id}`;
    return this.personService.findOne(+id);
  }
  // findOne(@Param('id') id: string) {
  //   return this.personService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
  //   return this.personService.update(+id, updatePersonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.personService.remove(+id);
  // }
}
