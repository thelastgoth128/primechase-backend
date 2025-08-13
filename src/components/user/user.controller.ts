import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';
import * as bcrypt from 'bcrypt'
import { Public } from '../auth/guards/public';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password,12)
    createUserDto.password = hash
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('detail-update')
  async update(@Body() updateUserDto: UpdateUserDto,@Req() request:Request) {
    return await this.userService.update(updateUserDto,request);
  }

  @Delete('delete')
  async remove(@Req() request:Request){
    return await this.userService.remove(request);
  }
}
