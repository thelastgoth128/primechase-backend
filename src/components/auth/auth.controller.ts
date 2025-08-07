import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { sign } from 'crypto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async signIn(@Body() signInDto:Record<string,any>){
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('forgot-password')
  async forgotpassword(@Body() forgotPasswordDto:Record<string,any>){
    return await this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post()
  async resetPassword(
      @Body('email') email: string,
      @Body('token') token : string,
      @Body('newPassword') newPassword: string
  ){
      const user = await this.authService.verifyResetToken(email,token)
      return this.authService.resetPassword(user,newPassword)
  }

    @Post('logout')
    async logout(@Res() response: Response){
      return this.authService.logout(response)
    }
}
