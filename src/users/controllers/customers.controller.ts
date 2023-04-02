import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
    constructor(private customersService: CustomersService) {}

    @Get()
    async findAll() {
        return await this.customersService.findAll();
    }

    @Get(':id')
    async get(@Param('id', MongoIdPipe) id: string) {
        return await this.customersService.findOne(id);
    }

    @Post()
    async create(@Body() payload: CreateCustomerDto) {
        return await this.customersService.create(payload);
    }

    @Put(':id')
    async update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCustomerDto,
    ) {
        return await this.customersService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id', MongoIdPipe) id: string) {
        return await this.customersService.remove(id);
    }
}
