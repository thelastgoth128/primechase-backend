import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/authGuard';
import { MailService } from '../services/mail.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global:true,
      secret:process.env.SECRET,
      signOptions: {expiresIn:'1d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },MailService,JwtService],
  exports: [JwtService]
})
export class AuthModule {}
