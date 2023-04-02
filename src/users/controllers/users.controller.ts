import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async get(@Param('id', MongoIdPipe) id: string) {
        return await this.usersService.findOne(id);
    }

    @Get(':id/orders')
    async getOrders(@Param('id', MongoIdPipe) id: string) {
        return await this.usersService.getOrderByUser(id);
    }

    @Post()
    async create(@Body() payload: CreateUserDto) {
        return await this.usersService.create(payload);
    }

    @Put(':id')
    async update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateUserDto,
    ) {
        return await this.usersService.update(id, payload);
    }

    @Delete(':id')
    async remove(@Param('id', MongoIdPipe) id: string) {
        return await this.usersService.remove(id);
    }
}
