import { ForbiddenException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../enums/role.enum';
import type { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userrep: Repository<User>,
    private jwtService : JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto

    const exists = await this.userrep.find({where: {email}})
    if (exists) {
      throw new ForbiddenException('email already exists, please login')
    }
    createUserDto.role = Role.CUSTOMER
    const user = await this.userrep.save(createUserDto)

    const payload = {
      userid: user.userid,
      name: user.name,  
      email: user.email,
      role: user.role,
      createdat: user.created_at
    }
    const jwt = await this.jwtService.signAsync(payload, {
      secret:process.env.JWT_SECRET
    })
    return {
      access_token: jwt,
      data: payload
    }
  }

  async findAll() {
    return this.userrep.find()
  }

  async findMail(email: string) {
    return await this.userrep.findOne({where: {email}})
  }

  async findOne(id: number) {
    return await this.userrep.findOne({where:{userid: id}})
  }

  async update(updateUserDto: UpdateUserDto,@Req() req:Request) {
    const user = req.user?.userid
    const requester = await this.userrep.findOne({where: {userid:user}})
    if(!requester){
      throw new NotFoundException('user not found')
    }
    Object.assign(requester, updateUserDto)
    await this.userrep.save(requester)
    
     const payload = {
      userid: requester.userid,
      name: requester.name,  
      email: requester.email,
      role: requester.role,
      createdat: requester.created_at
    }
    return {
      data: payload
    }
  }

  async remove(@Req() req:Request) {
    const userid = req.user?.userid
    const requester = await this.userrep.findOne({where:{userid}})

    if(!requester){
      throw new NotFoundException("user not found")
    }
    await this.userrep.delete(requester)
  }
}
