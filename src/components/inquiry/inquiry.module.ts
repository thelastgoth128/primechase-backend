import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';
import { Inquiry } from './entities/inquiry.entity';
import { MailService } from '../services/mail.service'; // Assuming MailService is globally available or imported

@Module({
    imports: [TypeOrmModule.forFeature([Inquiry])],
    controllers: [InquiryController],
    providers: [InquiryService, MailService], // Check if MailService needs to be here or imported from a module
})
export class InquiryModule { }
