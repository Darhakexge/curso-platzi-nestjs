import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Product } from '../entities/product.entity';
import {
    CreateProductDto,
    FilterProducDto,
    UpdateProductDto,
} from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>,
    ) {}

    async findAll(params?: FilterProducDto) {
        const { limit = 100, offset = 0, minPrice, maxPrice } = params;

        const filters: FilterQuery<Product> = {};

        if (minPrice) {
            filters.price.$gt = minPrice;
        }

        if (maxPrice) {
            filters.price.$lt = minPrice;
        }

        return await this.productModel
            .find(filters)
            .populate(['brand', 'category'])
            .skip(offset)
            .limit(limit)
            .exec();
    }

    async findOne(id: string) {
        const product = await this.productModel.findById(id).exec();

        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }

        return product;
    }

    async create(data: CreateProductDto) {
        const newProduct = new this.productModel(data);
        return await newProduct.save();
    }

    async update(id: string, changes: UpdateProductDto) {
        const product = await this.productModel
            .findByIdAndUpdate(id, { $set: changes }, { new: true })
            .exec();

        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }

        return product;
    }

    async remove(id: string) {
        return await this.productModel.findByIdAndRemove(id).exec();
    }
}
