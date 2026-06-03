import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async create(userId: string, orderData: any): Promise<OrderDocument> {
    const { items, total, deliveryAddress, paymentMethod, paymentStatus } = orderData;

    const newOrder = new this.orderModel({
      user: new Types.ObjectId(userId),
      items: items.map((item: any) => ({
        product: new Types.ObjectId(item.product._id || item.product),
        qty: item.qty || item.quantity,
        price: item.price || item.product.price,
      })),
      total,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentStatus || 'Pending',
      orderStatus: 'Processing',
    });

    const savedOrder = await newOrder.save();

    // If order created successfully, empty cart
    await this.cartService.clearCart(userId);

    return savedOrder.populate('items.product');
  }

  async findByUser(userId: string): Promise<OrderDocument[]> {
    return this.orderModel
      .find({ user: new Types.ObjectId(userId) })
      .populate('items.product')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<OrderDocument> {
    const order = await this.orderModel
      .findById(id)
      .populate('items.product')
      .populate('user', 'name email')
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: string, updateData: any): Promise<OrderDocument> {
    const updated = await this.orderModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .populate('items.product')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return updated;
  }
}
