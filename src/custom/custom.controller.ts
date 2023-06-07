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
  HostParam,
  Req,
  Res,
  Next,
  Header,
  HttpCode,
  Redirect,
  Render,
} from '@nestjs/common';
import { CustomService } from './custom.service';
import { PersonService } from 'src/person/person.service';
import { CreateCustomDto } from './dto/create-custom.dto';
import { UpdateCustomDto } from './dto/update-custom.dto';
import { NextFunction, Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
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

  @Get('bbb')
  @HttpCode(222)
  @Header('aaa', 'bbb')
  bbb1(
    @Next() next: NextFunction,
    @HostParam('host') host,
    // @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
  ) {
    // console.log('bbb1', host, req.hostname, req.url);
    console.log('bbb1', host);
    next();
    // res.end(this.customService.findAll() + this.PersonService.findAll() + host);
    return this.customService.findAll() + this.PersonService.findAll() + host;
  }
  @Get('bbb')
  bbb2(
    @HostParam('host') host,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('bbb2', host, req.hostname, req.url);
    // res.end(this.customService.findAll() + this.PersonService.findAll() + host);
    return this.customService.findAll() + this.PersonService.findAll() + host;
  }

  @Get('juejin')
  @Redirect('http://juejin.cn')
  redirect() {
    return true;
  }

  @Get('user')
  @Render('user')
  user() {
    return { name: 'ziyu', age: 20 };
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
