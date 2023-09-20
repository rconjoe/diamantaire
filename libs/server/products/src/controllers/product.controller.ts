/**
 * Shopify Controller class
 * @file shopify.controller.ts
 * @author: Bismark Frimpong
 * @date 11/23/2022
 * @version 1.0
 */

import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { PaginateFilterDto } from '../dto/paginate-filter.dto';
import { ProductVariantInput, PlpInput, ProductByVariantIdInput } from '../dto/product.input';
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

  @Get('catalog')
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'slug', required: true, description: 'Filter products by option types and values' })
  async findCatalogProducts(@Query() { slug, ...filterOptions }: { type: string; slug: string }) {
    const products = await this.productService.findProductsFromCollectionByOptions(slug, filterOptions);

    return products;
  }

  @Get('catalog/slugs')
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'type', required: false, description: 'Filter by Product Type' })
  async getCollectionSlugs(@Query() { type, slug, ...filterOptions }: { type: string; slug: string }) {
    const collectionSlugs = await this.productService.getCollectionSlugs({ type });
    const collectionOptions = await this.productService.getCollectionOptions(slug, filterOptions);

    return {
      input: {
        type,
        slug,
        filterOptions,
      },
      collectionSlugs,
      collectionOptions,
    };
  }

  @Get('catalog/options')
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'collectionSlug', required: true, description: 'Get allpossible configuration Options per collection' })
  async getCollectionOptions(@Query() { slug, ...filterOptions }: { slug: string } & Record<string, string>) {
    const collectionOptions = await this.productService.getCollectionOptions(slug, filterOptions);

    return collectionOptions;
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get all products' })
  async findProducts(@Query() { limit, page, sortOrder, sortBy, slug, productType }: PaginateFilterDto) {
    return await this.productService.findProducts({ limit, page, sortOrder, sortBy, slug, productType });
  }

  @Get('collection/diamondtypes/:collectionSlug')
  @ApiOperation({ summary: 'Get all diamond types of rgiven collection' })
  async getCollectionDiamondTypes(@Param() { collectionSlug }: { collectionSlug: string }) {
    return await this.productService.getCollectionDiamondTypes({ collectionSlug });
  }

  @Get('shopify/variant/:variantId')
  @ApiOperation({ summary: 'Get product by shopify variant id' })
  @ApiParam({ name: 'variantId', required: true })
  async findProductByVariantId(@Param() { variantId }: ProductByVariantIdInput) {
    return await this.productService.findProductByVariantId({ variantId });
  }

  @Get('plp')
  @ApiOperation({ summary: 'Get product list page data' })
  @ApiQuery({ name: 'slug', required: true, description: 'PLP slug' })
  @ApiQuery({ name: 'category', required: true, description: 'PLP category' })
  @ApiQuery({ name: 'locale', required: false, description: 'Content locale' })
  @ApiQuery({ name: 'metal', required: false, description: 'metal filter' })
  @ApiQuery({ name: 'diamondType', required: false, description: 'dimaond type filter' }) // TODO: should be an array
  @ApiQuery({ name: 'priceMin', required: false, description: 'price range filter min' })
  @ApiQuery({ name: 'priceMax', required: false, description: 'price range filter max' })
  @ApiQuery({ name: 'style', required: false, description: 'style filter' })
  @ApiQuery({ name: 'subStyle', required: false, description: 'substyle filter' })
  async datoPLP(
    @Query()
    { slug, category, locale, metal, diamondType, priceMin, priceMax, style, subStyle, page, limit }: PlpInput,
  ) {
    return await this.productService.findPlpData({
      slug,
      category,
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
