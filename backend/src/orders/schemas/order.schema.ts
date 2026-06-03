import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId | Product;

  @Prop({ required: true, default: 1 })
  qty: number;

  @Prop({ required: true })
  price: number;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId | User;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  total: number;

  @Prop({ type: Object, required: true })
  deliveryAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };

  @Prop({ required: true, default: 'COD' })
  paymentMethod: string;

  @Prop({ required: true, default: 'Pending' })
  paymentStatus: string;

  @Prop({ required: true, default: 'Processing' })
  orderStatus: string;

  @Prop()
  stripeSessionId?: string;

  @Prop()
  razorpayOrderId?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
