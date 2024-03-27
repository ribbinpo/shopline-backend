import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'assets/images',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        const allowedTypes = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (!allowedTypes.includes(ext)) {
          return cb(
            new BadRequestException(
              'Only JPG, JPEG, and PNG files are allowed',
            ),
            false,
          );
        }

        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          return cb(
            new BadRequestException('File size must be less than 5MB'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createProductDto.imageUrl = file.path;
      return this.productService.create(createProductDto);
    } catch (error) {
      console.error(error);
      throw new Error('Error creating product');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productService.remove(id);
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
