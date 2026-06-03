import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ default: 20 })
  stock: number;

  @Prop({ default: false, index: true })
  isFeatured: boolean;

  @Prop({ default: 5.0 })
  rating: number;

  @Prop({ default: 0 })
  numReviews: number;

  @Prop({ default: true })
  vatIncluded: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
