/**
 * Shopify Controller class
 * @file shopify.controller.ts
 * @author: Bismark Frimpong
 * @date 11/23/2022
 * @version 1.0
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductVariantInput } from '../dto/product.input';
import { ProductsService } from '../services/product.service';

@ApiTags('Product Variant')
@ApiHeader({ name: 'x-api-key', required: true })
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get('product')
  @ApiOperation({ summary: 'Get product variant' })
  @ApiQuery({ name: 'slug', required: true, description: 'Product slug' })
  @ApiQuery({ name: 'id', required: true, description: 'Product variant id' })
  @ApiQuery({ name: 'locale', required: false, description: 'Content locale' })
  async shopifyProduct(@Query() { id, slug, locale }: ProductVariantInput) {
    return await this.productService.findProductVariant({ slug, id, locale });
  }
}
