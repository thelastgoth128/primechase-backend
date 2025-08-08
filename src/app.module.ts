import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './components/user/entities/user.entity';
import { ProjectModule } from './components/project/project.module';

@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (configService : ConfigService)=>({
        type: "postgres",
        url:configService.get<string>('DATABASE_URL'),
        entities:[User],
        synchronize:false,
      }),
      inject: [ConfigService],
    }),
    ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
