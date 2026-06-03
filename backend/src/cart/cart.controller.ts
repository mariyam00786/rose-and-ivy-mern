import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getOrCreateCart(req.user.userId);
  }

  @Post('add')
  addToCart(@Req() req, @Body('productId') productId: string, @Body('quantity') quantity?: number) {
    return this.cartService.addToCart(req.user.userId, productId, quantity || 1);
  }

  @Patch('update')
  updateCartItem(@Req() req, @Body('productId') productId: string, @Body('quantity') quantity: number) {
    return this.cartService.updateCartItem(req.user.userId, productId, quantity);
  }

  @Delete('remove/:productId')
  removeFromCart(@Req() req, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }

  @Delete('clear')
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
