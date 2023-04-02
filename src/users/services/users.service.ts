import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private productService: ProductsService,
    ) {}

    async findAll() {
        return await this.userModel.find().exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return user;
    }

    async create(data: CreateUserDto) {
        const newUser = new this.userModel(data);
        return await newUser.save();
    }

    async update(id: string, changes: UpdateUserDto) {
        const user = await this.userModel
            .findByIdAndUpdate(id, { $set: changes }, { new: true })
            .exec();

        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }

        return user;
    }

    async remove(id: string) {
        return await this.userModel.findByIdAndRemove(id).exec();
    }

    async getOrderByUser(id: string) {
        const user = this.findOne(id);

        return {
            date: new Date(),
            // user,
            // products: await this.productService.findAll(),
        };
    }
}
