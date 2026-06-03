import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@Req() req) {
    return this.wishlistService.getOrCreateWishlist(req.user.userId);
  }

  @Post('toggle/:productId')
  toggleWishlist(@Req() req, @Param('productId') productId: string) {
    return this.wishlistService.toggleWishlist(req.user.userId, productId);
  }
}
