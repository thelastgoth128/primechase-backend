import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userrep : Repository<User>,
    private readonly userService : UserService,
    private readonly jwtService : JwtService,
  ){}
 
  async signIn(email: string, pass: string){
    const user = await this.userService.findMail(email)
    if(!user){
      throw new BadRequestException('wrong credentials')
    }
    if(!await bcrypt.compare(pass, user.password)){
      throw new BadRequestException("wrong credentials")
    }
    const payload = {
      userid: user.userid,
      name: user.name,  
      email: user.email,
      role: user.role,
      createdat: user.created_at
    }
    const jwt = await this.jwtService.signAsync(payload)
    return {
      access_token : jwt,
      data : payload
    }
  }

  async logout(res:Response){
    res.clearCookie('jwt',{
      httpOnly:true,
      secure:true
    })
    return({
      message : "you have logged out"
    })
  }
}
