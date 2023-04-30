import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  get(id: number) {
    return this.productRepository.findOne({
      where: { id: id },
    });
  }

  delete(id: number) {
    return this.productRepository.delete({ id })
  }

  async create(data: any): Promise<Product> {
    return this.productRepository.save(data);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id: id },
    })
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async updateProductById(id: number, data: any): Promise<any> {
    return this.productRepository.update(id, data);
  }

  async deleteProductById(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
