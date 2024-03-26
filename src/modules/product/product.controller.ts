import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    this.productService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('category/add/:productId')
  addCategory(
    @Param('productId') productId: string,
    @Body() body: { categoryId: string[] },
  ) {
    const { categoryId } = body;
    return this.productService.addCategory(productId, categoryId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('category/remove/:productId')
  removeCategory(
    @Param('productId') productId: string,
    @Body() body: { categoryId: string[] },
  ) {
    const { categoryId } = body;
    return this.productService.removeCategory(productId, categoryId);
  }
}
