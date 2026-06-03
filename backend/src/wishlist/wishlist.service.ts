import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { ProductsService } from '../products/products.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
    private productsService: ProductsService,
  ) {}

  async getOrCreateWishlist(userId: string): Promise<WishlistDocument> {
    let wishlist = await this.wishlistModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate('products')
      .exec();

    if (!wishlist) {
      wishlist = new this.wishlistModel({ user: new Types.ObjectId(userId), products: [] });
      await wishlist.save();
      wishlist = await wishlist.populate('products');
    }
    return wishlist;
  }

  async toggleWishlist(userId: string, productId: string): Promise<WishlistDocument> {
    await this.productsService.findById(productId);

    const wishlist = await this.getOrCreateWishlist(userId);
    const prodId = new Types.ObjectId(productId);

    const exists = wishlist.products.some(
      (p) => (p as any)._id?.toString() === productId || (p as any).toString() === productId,
    );

    if (exists) {
      wishlist.products = wishlist.products.filter(
        (p) => (p as any)._id?.toString() !== productId && (p as any).toString() !== productId,
      ) as any;
    } else {
      wishlist.products.push(prodId as any);
    }

    await wishlist.save();
    return this.getOrCreateWishlist(userId);
  }
}
