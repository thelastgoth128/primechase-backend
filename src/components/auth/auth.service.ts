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
import { MailService } from '../services/mail.service';
import { nanoid } from "nanoid";
import { addMinutes } from 'date-fns'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userrep : Repository<User>,
    private readonly userService : UserService,
    private readonly jwtService : JwtService,
    private readonly mailService : MailService
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

  async forgotPassword(email:string){
    const user = await this.userService.findMail(email)

    if(user){
      const reset_token = nanoid(64)
      const expirationTime = addMinutes(new Date(), 60)

      await this.userService.saveResetToken(email, reset_token, expirationTime)
      await this.mailService.sendPasswordResetEmail(email, reset_token)
    }
  }

  async verifyResetToken(email:string, token:string){
    const user = await this.userService.findMail(email)
    if(!user || user.reset_token || !user.reset_token_expiry){
      throw new Error('Invalid or expired token')
    }

    const noew = new Date()
    if( noew > new Date(user.reset_token_expiry) ){
      throw new Error('Token has expired')
    }
    if ( user.reset_token !== token){
      throw new Error ('Invalid token')
    }
    return user
  }

  async resetPassword(user: User, newPassword:string){
    user.password = await this.hashPassword(newPassword)
    user.reset_token = null
    user.reset_token_expiry = null

    await this.userrep.save(user)

    return {
      message: 'Password has been successfully reset'
    }
  }

  private async hashPassword(password:string){
    const hashPassword = await bcrypt.hash(password,12)
    return hashPassword
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
