/**
 * Shopify Controller class
 * @file shopify.controller.ts
 * @author: Bismark Frimpong
 * @date 11/23/2022
 * @version 1.0
 */

import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { PaginateFilterDto } from '../dto/paginate-filter.dto';
import { ProductVariantInput, PlpInput } from '../dto/product.input';
import { ProductsService } from '../services/product.service';
@ApiTags('Products')
@ApiHeader({ name: 'x-api-key', required: true })
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get product variant' })
  @ApiQuery({ name: 'slug', required: true, description: 'collection slug' })
  @ApiQuery({ name: 'id', required: true, description: 'Product slug' })
  @ApiQuery({ name: 'locale', required: false, description: 'Content locale' })
  async shopifyProduct(@Query() { id, slug, locale }: ProductVariantInput) {
    return await this.productService.findProductBySlug({ slug, id, locale });
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get all products' })
  async findProducts(@Query() { limit, page, sortOrder, sortBy, slug, productType }: PaginateFilterDto) {
    return await this.productService.findProducts({ limit, page, sortOrder, sortBy, slug, productType });
  }

  @Get('plp')
  @ApiOperation({ summary: 'Get product list page data' })
  @ApiQuery({ name: 'slug', required: true, description: 'PLP slug' })
  @ApiQuery({ name: 'locale', required: false, description: 'Content locale' })
  @ApiQuery({ name: 'metal', required: false, description: 'metal filter' })
  @ApiQuery({ name: 'diamondType', required: false, description: 'dimaond type filter' }) // TODO: should be an array
  @ApiQuery({ name: 'priceMin', required: false, description: 'price range filter min' })
  @ApiQuery({ name: 'priceMax', required: false, description: 'price range filter max' })
  @ApiQuery({ name: 'style', required: false, description: 'style filter' })
  @ApiQuery({ name: 'subStyle', required: false, description: 'substyle filter' })
  async datoPLP(
    @Query() { slug, locale, metal, diamondType, priceMin = 0, priceMax = 99999999, style, subStyle, page, limit }: PlpInput,
  ) {
    return await this.productService.findPlpData({
      slug,
      locale,
      metal,
      diamondType,
      priceMin,
      priceMax,
      style,
      subStyle,
      page,
      limit,
    });
  }
}
