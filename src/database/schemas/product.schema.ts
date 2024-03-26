import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';

@Schema()
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: Number, default: 0 })
  quantity: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export type ProductDocument = HydratedDocument<Product>;

export const ProductSchema = SchemaFactory.createForClass(Product);
