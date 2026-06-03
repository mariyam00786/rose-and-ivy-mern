import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(category?: string, query?: string): Promise<ProductDocument[]> {
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    return this.productModel.find(filter).exec();
  }

  async findBySlug(slug: string): Promise<ProductDocument> {
    const product = await this.productModel.findOne({ slug }).exec();
    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }
    return product;
  }

  async findById(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(createProductData: any): Promise<ProductDocument> {
    const newProduct = new this.productModel(createProductData);
    return newProduct.save();
  }

  async update(id: string, updateProductData: any): Promise<ProductDocument> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, { $set: updateProductData }, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<ProductDocument> {
    const deleted = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return deleted;
  }
}
