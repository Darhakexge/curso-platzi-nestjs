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
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { BrandsService } from '../services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Get()
    @ApiOperation({
        description: 'Lista todas las marcas',
    })
    async getBrands() {
        return await this.brandsService.findAll();
    }

    @Get(':id')
    async getOne(@Param('id', MongoIdPipe) id: string) {
        return await this.brandsService.findOne(id);
    }

    @Post()
    async create(@Body() payload: CreateBrandDto) {
        return await this.brandsService.create(payload);
    }

    @Put(':id')
    async update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateBrandDto,
    ) {
        return await this.brandsService.update(id, payload);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', MongoIdPipe) id: string) {
        return await this.brandsService.remove(id);
    }
}
