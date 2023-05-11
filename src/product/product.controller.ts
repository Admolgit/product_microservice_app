import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/user/guards/auth.guards';
// import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
  ) {}

  // @UseGuards(AuthGuard)
  @Post()
  // @UseGuards(AuthGuard)
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

    this.client.emit(
      { cmd: 'product_created' },
      {
        ...product,
      },
    );

    return product;
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);

    // this.client.emit({cmd: 'product1'}, {
    //   ...product
    // });

    return product;
  }

  // @UseGuards(AuthGuard)
  @Get()
  async getAllProducts() {
    console.log('Getting all products');
    const product = await this.productService.getAllProducts();

    // this.client.emit('product_all', product);

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

    product.then(dat => this.client.emit('products_updated',
    {
      ...dat,
    },
  ));

    return product;
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: number) {
    const product = await this.productService.deleteProductById(id);

    const prod = this.productService.delete(id)

    console.log(product, 'PRODUCER', prod, 'PRODUCERID')

    // prod.then(data => console.log(data))

    this.client.emit(
      { cmd: 'products_deleted' },
      {
        id,
      },
    );

    return product;
  }
}
