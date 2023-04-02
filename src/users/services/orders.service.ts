import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<Order>,
    ) {}

    async findAll() {
        return await this.orderModel.find().exec();
    }

    async findOne(id: string) {
        const order = await this.orderModel.findById(id).exec();

        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }

        return order;
    }

    async create(data: CreateOrderDto) {
        const newOrder = new this.orderModel(data);
        return await newOrder.save();
    }

    async update(id: string, changes: UpdateOrderDto) {
        const order = await this.orderModel
            .findByIdAndUpdate(id, { $set: changes }, { new: true })
            .exec();

        if (!order) {
            throw new NotFoundException(`Order #${id} not found`);
        }

        return order;
    }

    async remove(id: string) {
        return await this.orderModel.findByIdAndRemove(id).exec();
    }

    async addProducts(orderId: string, productsIds: string[]) {
        const order = await this.orderModel.findById(orderId);
        productsIds.forEach((pId) => order.products.push(pId));
        return await order.save();
    }

    async removeProduct(orderId: string, productId: string) {
        const order = await this.findOne(orderId);
        order.products.pull(productId);
        return await order.save();
    }
}
