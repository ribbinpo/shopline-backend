import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @Optional()
  @IsString()
  description?: string;

  @Optional()
  @IsUrl()
  imageUrl?: string;

  @Optional()
  @IsNumber()
  @IsString()
  quantity: number;

  // categories: Category[];
}
