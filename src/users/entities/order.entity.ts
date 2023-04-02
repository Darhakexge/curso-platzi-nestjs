import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import { Customer } from './customer.entity';

@Schema()
export class Order extends Document {
    @Prop()
    date: Date;

    @Prop({ type: Types.ObjectId, ref: Customer.name })
    category: Customer | Types.ObjectId;

    @Prop({
        required: true,
        type: [{ type: Types.ObjectId, ref: Product.name }],
    })
    products: Types.Array<Product | Types.ObjectId>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
