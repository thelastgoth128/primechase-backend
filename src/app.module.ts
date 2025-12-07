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
import { JwtModule } from '@nestjs/jwt';
import { ImageController } from './components/image/image.controller';
import { CategorysModule } from './components/categorys/categorys.module';
import { Category } from './components/categorys/entities/category.entity';
import { Content } from './components/content/entities/content.entity';
import { ContentModule } from './components/content/content.module';
import { BlogPost } from './components/blog/entities/blog-post.entity';
import { BlogModule } from './components/blog/blog.module';
import { Inquiry } from './components/inquiry/entities/inquiry.entity';
import { InquiryModule } from './components/inquiry/inquiry.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProjectModule,
    ImageModule,
    CategorysModule,
    JwtModule,
    ContentModule,
    BlogModule,
    InquiryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>('DATABASE_URL'),
        entities: [User, Project, Category, Content, BlogPost, Inquiry],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads'
    }),
  ],
  controllers: [AppController, ImageController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*')
  }
}
