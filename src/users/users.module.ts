import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';
import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Customer.name, schema: CustomerSchema },
            { name: Order.name, schema: OrderSchema },
        ]),
    ],
    controllers: [CustomerController, UsersController, OrdersController],
    providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
