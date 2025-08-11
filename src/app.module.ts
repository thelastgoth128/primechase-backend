import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './components/user/entities/user.entity';
import { ProjectModule } from './components/project/project.module';
import { Project } from './components/project/entities/project.entity';
import { JwtMiddleware } from './components/services/jwtMiddleware';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './components/services/cloudinary.service';
import { ImageModule } from './components/image/image.module';
import { CategoryModule } from './components/category/category.module';
import { Category } from './components/category/entities/category.entity';

@Module({
  imports: [UserModule, AuthModule, ProjectModule, ImageModule, CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (configService : ConfigService)=>({
        type: "postgres",
        url:configService.get<string>('DATABASE_URL'),
        entities:[User,Project,Category],
        synchronize:false,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest:'./uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(JwtMiddleware).forRoutes('*')
  }
}
