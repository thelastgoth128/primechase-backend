import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { MailService } from '../services/mail.service';

@Injectable()
export class InquiryService {
    constructor(
        @InjectRepository(Inquiry)
        private inquiryRepository: Repository<Inquiry>,
        private mailService: MailService
    ) { }

    async create(createInquiryDto: CreateInquiryDto) {
        const inquiry = this.inquiryRepository.create(createInquiryDto);
        const savedInquiry = await this.inquiryRepository.save(inquiry);

        // Send email alert (fire and forget or await depending on requirement)
        try {
            await this.mailService.sendInquiryAlert(savedInquiry);
        } catch (error) {
            console.error('Failed to send inquiry alert email', error);
        }

        return { message: 'Inquiry received successfully' };
    }

    async findAll() {
        return await this.inquiryRepository.find({ order: { created_at: 'DESC' } });
    }

    async findOne(id: number) {
        const inquiry = await this.inquiryRepository.findOne({ where: { id } });
        if (!inquiry) {
            throw new NotFoundException(`Inquiry with ID ${id} not found`);
        }
        return inquiry;
    }

    async updateStatus(id: number, status: string) {
        const inquiry = await this.findOne(id);
        inquiry.status = status;
        return await this.inquiryRepository.save(inquiry);
    }

    async remove(id: number) {
        const inquiry = await this.findOne(id);
        return await this.inquiryRepository.remove(inquiry);
    }
}
