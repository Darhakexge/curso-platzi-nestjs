import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name)
        private customerModel: Model<Customer>,
    ) {}

    async findAll() {
        return await this.customerModel.find().exec();
    }

    async findOne(id: string) {
        const customer = await this.customerModel.findById(id).exec();

        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`);
        }

        return customer;
    }

    async create(data: CreateCustomerDto) {
        const newCustomer = new this.customerModel(data);
        return await newCustomer.save();
    }

    async update(id: string, changes: UpdateCustomerDto) {
        const customer = await this.customerModel
            .findByIdAndUpdate(id, { $set: changes }, { new: true })
            .exec();

        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`);
        }

        return customer;
    }

    async remove(id: string) {
        return await this.customerModel.findByIdAndRemove(id).exec();
    }
}
