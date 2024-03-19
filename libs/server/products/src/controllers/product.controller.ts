/**
 * Shopify Controller class
 * @file shopify.controller.ts
 * @author: Bismark Frimpong
 * @date 11/23/2022
 * @version 1.0
 */

import { convertObjTreeToArray } from '@diamantaire/shared-product';
import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { PaginateFilterDto } from '../dto/paginate-filter.dto';
import {
  ProductVariantInput,
  PlpInput,
  ProductByVariantIdInput,
  ProductInput,
  ProductByContentIdsInput,
  ProductByProductSlugsInput,
  ProductSkusInput,
} from '../dto/product.input';
import { ProductsService } from '../services/product.service';
@ApiTags('Products')
@ApiHeader({ name: 'x-api-key', required: true })
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Get('plp')
  @ApiOperation({ summary: 'Get product variant' })
  @ApiQuery({ name: 'slug', required: true, description: 'Plp slug' })
  @ApiQuery({ name: 'category', required: true, description: 'Plp category' })
  @ApiQuery({ name: 'locale', required: false, description: 'Content locale' })
  async function(@Query() { category, slug, locale, metal, diamondType, priceMin, priceMax, style, subStyle, sortBy, sortOrder, limit, page }: PlpInput) {

    // Support for multiselect filters
    const diamondTypes = diamondType ? diamondType.split(',').map((s:string) => s.trim()) : undefined;
    const styles = style ? style.split(',').map((s:string) => s.trim()) : undefined;
    const subStyles = subStyle ? subStyle.split(',').map((s:string) => s.trim()) : undefined;
    const metals = metal ? metal.split(',').map((s:string) => s.trim()) : undefined;

    const filters = {
      diamondTypes,
      metals,
      styles,
      subStyles,
      priceMin,
      priceMax
    };

    return await this.productService.getPlpProducts({ slug, category, locale, filters, sortBy, sortOrder, limit, page });
  }

  @Get()
  @ApiOperation({ summary: 'Get product variant' })
  @ApiQuery({ name: 'slug', required: true, description: 'collection slug' })
  @ApiQuery({ name: 'id', required: true, description: 'Product slug' })
  @ApiQuery({ name: 'locale', required: false, description: 'Content locale' })
  async shopifyProduct(@Query() { id, slug, locale }: ProductVariantInput) {
    return await this.productService.findProductBySlug({ slug, id, locale });
  }

  @Get('/contentids')
  @ApiOperation({ summary: 'Get products by content IDs' })
  @ApiQuery({ name: 'contentids', required: true, description: 'Array of contentIds' })
  async getProductsByIds(@Query() { ids, locale }: ProductByContentIdsInput) {
    const contentIds = ids.split(',').map((s) => s.trim());

    return await this.productService.findProductsByContentIds(contentIds, locale);
  }

  @Get('/list-items')
  @ApiOperation({ summary: 'Get plp schema items by content IDs' })
  @ApiQuery({ name: 'contentids', required: true, description: 'Array of contentIds' })
  async getListProductsByIds(@Query() { ids, locale }: ProductByContentIdsInput) {
    const contentIds = ids.split(',').map((s) => s.trim());

    return await this.productService.getListProductsByIds(contentIds, locale);
  }

  @Get('/slugs')
  @ApiOperation({ summary: 'Get products by content IDs' })
  @ApiQuery({ name: 'contentids', required: true, description: 'Array of contentIds' })
  async getProductsBySlugs(@Query() { ids }: ProductByProductSlugsInput) {
    const productSlugs = ids.split(',').map((s) => s.trim());

    const products = await this.productService.findProductsByProductSlugs(productSlugs);
    const lowestPricesByCollection = await this.productService.getLowestPricesByCollection();
    const collectionSet = products.reduce((acc, product) => {
      acc.add(product.collectionSlug);

      return acc;
    }, new Set());
    const reducedLowerPrices = Object.entries(lowestPricesByCollection).reduce((map, [collectionSlug, price]) => {
      if (collectionSet.has(collectionSlug)) {
        map[collectionSlug] = price;
      }

      return map;
    }, {});

    return {
      products,
      lowestPricesByCollection: reducedLowerPrices,
    };
  }

  @Get('options')
  @ApiOperation({ summary: 'Get product configuration options' })
  @ApiQuery({ name: 'collectionSlug', required: true, description: 'collection slug' })
  @ApiQuery({ name: 'productSlug', required: true, description: 'Product slug' })
  async getProductOptionConfigs(@Query() { collectionSlug, productSlug }: ProductInput) {
    return await this.productService.getProductOptionConfigs(collectionSlug, productSlug);
  }

  @Get('list')
  @ApiOperation({ summary: 'Get all products by slug and their content' })
  @ApiQuery({ name: 'slugs', required: true, description: 'Find specific product and content by slugs' })
  @ApiQuery({ name: 'locale', required: true, description: 'Locale in which content should be returned as' })
  async getProducts(@Query() { slugs, locale }: { slugs: string, locale: string }) {
    const slugsArray = slugs.split(',').map(s => s.trim());
    const products = await this.productService.findProductsByProductSlugs(slugsArray);

    return await this.productService.findProductContent(products, locale);
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
      collectionSlugs,
      collectionOptions,
    };
  }

  @Get('collection/tree/:slug')
  @ApiOperation({ summary: 'Get collection data in a tree data structure' })
  @ApiQuery({ name: 'slug', required: false, description: 'Filter by Product Type' })
  async getCollectionTreeData(@Param() { slug }: { slug: string }) {
    const collectionTree = await this.productService.getCollectionTreeStruct(slug);

    return convertObjTreeToArray(collectionTree);
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

  @Get('collection/sku/:collectionSlug')
  @ApiOperation({ summary: 'Get all default skus for the provided collection' })
  @ApiParam({ name: 'collectionSlug', required: true })
  async getAllProductDefaultSkusByCollection(@Param() { collectionSlug }: ProductSkusInput) {
    return await this.productService.getAllProductDefaultSkusByCollection(collectionSlug);
  }

  @Get('shopify/variant/:variantId')
  @ApiOperation({ summary: 'Get product by shopify variant id' })
  @ApiParam({ name: 'variantId', required: true })
  async findProductByVariantId(@Param() { variantId }: ProductByVariantIdInput) {
    return await this.productService.findProductByVariantId({ variantId });
  }

}
