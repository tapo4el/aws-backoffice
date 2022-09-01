import 'dotenv/config';

import { Injectable, Dependencies } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
@Dependencies(HttpService)
export class AppService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  async getCart() {
    const result = await this.httpService.get(process.env.cart).toPromise();
    return result.data;
  }

  async putCart(items) {
    const result = await this.httpService.put(process.env.cart, items).toPromise();
    return result.data;
  }

  async getProducts() {
    const result = await this.httpService.get(process.env.product).toPromise();
    return result.data;
  }

  async postProduct(body) {
    const result = await this.httpService.post(process.env.product, body).toPromise();
    return result.data;
  }
}
