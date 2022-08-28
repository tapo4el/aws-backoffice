import { Injectable, Dependencies } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
@Dependencies(HttpService)
export class AppService {
  constructor(httpService) {
    this.httpService = httpService;
  }

  async getCart() {
    const result = await this.httpService.get('http://tapo4el-cart-api-dev.us-east-1.elasticbeanstalk.com/api/profile/cart').toPromise();
    return result.data;
  }

  async putCart(items) {
    const result = await this.httpService.put('http://tapo4el-cart-api-dev.us-east-1.elasticbeanstalk.com/api/profile/cart', items).toPromise();
    return result.data;
  }

  async getProducts() {
    const result = await this.httpService.get('https://wyofw9a4rb.execute-api.us-east-1.amazonaws.com/products').toPromise();
    return result.data;
  }

  async postProduct(body) {
    const result = await this.httpService.post('https://wyofw9a4rb.execute-api.us-east-1.amazonaws.com/products', body).toPromise();
    return result.data;
  }
}
