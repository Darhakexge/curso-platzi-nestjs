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
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import {
    CreateProductDto,
    FilterProducDto,
    UpdateProductDto,
} from '../dtos/products.dtos';

import { ProductsService } from './../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @ApiOperation({
        description: 'Lista todos los productos',
    })
    async getProducts(@Query() params: FilterProducDto) {
        return await this.productsService.findAll(params);
    }

    @Get(':id')
    async getOne(@Param('id', MongoIdPipe) id: string) {
        return await this.productsService.findOne(id);
    }

    @Post()
    async create(@Body() payload: CreateProductDto) {
        return await this.productsService.create(payload);
    }

    @Put(':id')
    async update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateProductDto,
    ) {
        return await this.productsService.update(id, payload);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', MongoIdPipe) id: string) {
        return await this.productsService.remove(id);
    }
}
