import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/user/guards/auth.guards';
// import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService,
    @Inject("AUTH_SERVICE") private readonly client: ClientProxy
    ) {}

  // @UseGuards(LocalAuthGuard)
  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
  ) {

    const product = await this.productService.create({
      name,
      description,
      price,
      quantity,
    });

    this.client.emit('product_created', product);

    return product;
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);

    this.client.send('product1', product);

    return product;
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async getAllProducts() {
    console.log('Getting all products')
    const product = await this.productService.getAllProducts();

    this.client.emit('product_all', product);

    return product;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
  ) {
    const data = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    };
   await this.productService.updateProductById(id, data);

   const product = this.productService.get(id);

   this.client.emit('product_updated', product);

    return product;
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: number) {
    const product = await this.productService.deleteProductById(id);

    // this.client.emit('product_deleted', product.id);

    return product;
  }

  // @EventPattern('login')
  // async hello(data: any): Promise<{data: string}> {
  //   const { token, user } = data
  //   console.log(token, user, "PRODUCT_CONTROLLER")
  //   return data;
  // }
}
