import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    @ApiOperation({
        description: 'Lista todas las categorías',
    })
    async getCategories() {
        return await this.categoriesService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id', MongoIdPipe) id: string) {
        return await this.categoriesService.findOne(id);
    }

    @Post()
    async create(@Body() payload: CreateCategoryDto) {
        return await this.categoriesService.create(payload);
    }

    @Put(':id')
    async update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCategoryDto,
    ) {
        return await this.categoriesService.update(id, payload);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', MongoIdPipe) id: string) {
        return await this.categoriesService.remove(id);
    }
}
