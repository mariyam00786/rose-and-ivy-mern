import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('cod')
  async payWithCOD(@Req() req, @Body() orderData: any) {
    return this.ordersService.create(req.user.userId, {
      ...orderData,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
    });
  }

  @Post('stripe/create-session')
  async createStripeSession(@Req() req, @Body() body: any) {
    const dummySessionId = 'cs_test_' + Math.random().toString(36).substring(2);
    return {
      id: dummySessionId,
      url: `${body.successUrl}?session_id=${dummySessionId}`,
    };
  }

  @Post('razorpay/create-order')
  async createRazorpayOrder(@Req() req, @Body() body: any) {
    const dummyOrderId = 'order_test_' + Math.random().toString(36).substring(2);
    return {
      id: dummyOrderId,
      amount: body.amount,
      currency: 'AED',
    };
  }

  @Post('stripe/webhook')
  async stripeWebhook(@Body() body: any) {
    return { received: true };
  }

  @Post('razorpay/verify')
  async verifyRazorpay(@Body() body: any) {
    return { status: 'success' };
  }
}
