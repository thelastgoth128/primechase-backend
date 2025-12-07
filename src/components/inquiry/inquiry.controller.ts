import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Public } from '../auth/guards/public';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('inquiry')
export class InquiryController {
    constructor(private readonly inquiryService: InquiryService) { }

    @Public()
    @Post()
    create(@Body() createInquiryDto: CreateInquiryDto) {
        return this.inquiryService.create(createInquiryDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    findAll() {
        return this.inquiryService.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    findOne(@Param('id') id: string) {
        return this.inquiryService.findOne(+id);
    }

    @Patch(':id/status')
    @Roles(Role.ADMIN)
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.inquiryService.updateStatus(+id, status);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string) {
        return this.inquiryService.remove(+id);
    }
}
