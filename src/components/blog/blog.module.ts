import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogPost } from './entities/blog-post.entity';
import { ImageModule } from '../image/image.module';

@Module({
    imports: [TypeOrmModule.forFeature([BlogPost]), ImageModule],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule { }
