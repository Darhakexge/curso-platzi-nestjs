import { PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    readonly customer: string;

    @IsNotEmpty()
    @IsDate()
    readonly date: Date;

    @IsArray()
    @IsNotEmpty()
    readonly products: string[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class AddProductsToOrderDto {
    @IsArray()
    @IsNotEmpty()
    readonly productsIds: string[];
}
