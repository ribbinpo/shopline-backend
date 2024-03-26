import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @Optional()
  description?: string;

  @ValidateIf((o) => o.imageUrl !== undefined)
  @IsUrl()
  imageUrl?: string;

  @ValidateIf((o) => o.quantity !== undefined)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  quantity: number;
}
