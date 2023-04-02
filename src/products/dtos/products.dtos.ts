import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    Min,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty()
    readonly image: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly category: string;

    @IsNotEmpty()
    @IsMongoId()
    readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProducDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    minPrice: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    maxPrice: number;
}
