import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  UseFilters,
  HttpException,
  HttpStatus,
  UseGuards,
  UsePipes,
  ParseIntPipe,
  SetMetadata,
  Headers,
  Ip,
  Session,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PersonFilter } from './person.filter';
import { PersonGuard } from './person.guard';
import { PersonInterceptor } from './person.interceptor';
import { ValidationPipe } from './person.pipe';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('api/person')
@SetMetadata('roles', ['user'])
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
    console.log(JSON.stringify(createPersonDto));

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

  @Get()
  @UseFilters(PersonFilter)
  @UseGuards(PersonGuard)
  @UseInterceptors(PersonInterceptor)
  @SetMetadata('roles', ['admin'])
  @UsePipes(ValidationPipe)
  findAll(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ) {
    console.log('get findAll', accept, headers);
    throw new HttpException('XXX', HttpStatus.BAD_REQUEST);
    return this.personService.findAll();
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log(ip);
  }
  @Get('/session')
  session(@Session() session) {
    console.log(session);
    if (!session.count) {
      session.count = 0;
    }
    session.count += 1;
    return session.count;
  }
  // HTTP数据传输方式：query
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name},age=${age}`;
  }

  // HTTP数据传输方式：urlParams
  @Get(':id')
  urlParam(@Param('id', ParseIntPipe) id: string) {
    // return `received: id=${id}`;
    console.log(typeof id, id);

    return this.personService.findOne(+id);
  }
  // findOne(@Param('id') id: string) {
  //   return this.personService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
