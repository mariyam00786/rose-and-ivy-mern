import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productsService: ProductsService,
  ) {}

  async getOrCreateCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartModel
      .findOne({ user: new Types.ObjectId(userId) })
      .populate('items.product')
      .exec();

    if (!cart) {
      cart = new this.cartModel({ user: new Types.ObjectId(userId), items: [] });
      await cart.save();
      // Populate to ensure empty items but correct structure returned
      cart = await cart.populate('items.product');
    }
    return cart;
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<CartDocument> {
    await this.productsService.findById(productId);

    const cart = await this.getOrCreateCart(userId);
    const itemIndex = cart.items.findIndex(
      (item) => (item.product as any)._id?.toString() === productId || (item.product as any) === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: new Types.ObjectId(productId), quantity } as any);
    }

    await cart.save();
    return this.getOrCreateCart(userId);
  }

  async updateCartItem(userId: string, productId: string, quantity: number): Promise<CartDocument> {
    const cart = await this.getOrCreateCart(userId);
    const itemIndex = cart.items.findIndex(
      (item) => (item.product as any)._id?.toString() === productId || (item.product as any) === productId,
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
    } else {
      throw new NotFoundException('Item not found in cart');
    }

    return this.getOrCreateCart(userId);
  }

  async removeFromCart(userId: string, productId: string): Promise<CartDocument> {
    const cart = await this.getOrCreateCart(userId);
    cart.items = cart.items.filter(
      (item) => (item.product as any)._id?.toString() !== productId && (item.product as any) !== productId,
    );
    await cart.save();
    return this.getOrCreateCart(userId);
  }

  async clearCart(userId: string): Promise<CartDocument> {
    const cart = await this.getOrCreateCart(userId);
    cart.items = [];
    await cart.save();
    return cart;
  }
}
