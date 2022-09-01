import {
  Controller,
  Dependencies,
  Get,
  Put,
  Bind,
  Body,
  UseInterceptors,
  CacheInterceptor
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@Dependencies(AppService)
export class AppController {

  constructor(appService) {
    this.appService = appService;
  }

  @Get('products')
  @UseInterceptors(CacheInterceptor)
  async getProducts() {
    return this.appService.getProducts();
  }

  @Put('product')
  @Bind(Body())
  putProduct(body) {
    return this.appService.postProduct(body);
  }

  @Get('/profile/cart')
  getCart() {
    return this.appService.getCart();
  }

  @Put('/profile/cart')
  @Bind(Body())
  putCart(body) {
    return this.appService.putCart(body);
  }
}
