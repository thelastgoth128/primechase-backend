import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogPost)
        private blogRepository: Repository<BlogPost>,
    ) { }

    async create(createBlogDto: CreateBlogDto) {
        const blog = this.blogRepository.create(createBlogDto);
        return await this.blogRepository.save(blog);
    }

    async findAll() {
        return await this.blogRepository.find({ order: { created_at: 'DESC' } });
    }

    async findOne(id: number) {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) {
            throw new NotFoundException(`Blog post with ID ${id} not found`);
        }
        return blog;
    }

    async update(id: number, updateBlogDto: UpdateBlogDto) {
        const blog = await this.findOne(id);
        Object.assign(blog, updateBlogDto);
        blog.updated_at = new Date();
        return await this.blogRepository.save(blog);
    }

    async remove(id: number) {
        const blog = await this.findOne(id);
        return await this.blogRepository.remove(blog);
    }
}
