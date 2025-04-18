import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductVariantInput {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly slug?: string;

  @ApiProperty({
    example: '16168879784002',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id?: string;

  @ApiProperty({
    example: 'en_US',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly locale?: string;

  @ApiProperty({
    example: 'CA',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly countryCode?: string;

  @ApiProperty({
    example: 'yellow-gold',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly metal?: string;

  @ApiProperty({
    example: 'oval',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly diamondType?: string;

  @ApiProperty({
    example: 100,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly priceMin?: number;

  @ApiProperty({
    example: 1000,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly priceMax?: number;
}

export class ProductInput {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly collectionSlug?: string;

  @ApiProperty({
    example: '16168879784002',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly productSlug?: string;

  @ApiProperty({
    example: 'en_US',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly locale?: string;
}

export class PlpInput {
  @ApiProperty({
    example: 'graduation-gifts-jewelry',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly slug: string;

  @ApiProperty({
    example: 'jewelry',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly category: string;

  @ApiProperty({
    example: 'en_US',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly locale?: string;

  @ApiProperty({
    example: 'yellow-gold',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly metal?: string;

  @ApiProperty({
    example: 'oval',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly diamondType?: string;

  @ApiProperty({
    example: 'solitaire',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly style?: string;

  @ApiProperty({
    example: 'anniversary',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly subStyle?: string;

  @ApiProperty({
    example: 100,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly priceMin?: number;

  @ApiProperty({
    example: 1000,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly priceMax?: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number;

  @ApiProperty({
    example: 'price',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortBy?: string;

  @ApiProperty({
    example: 'desc',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortOrder?: string;
}

export class ProductSlugInput {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly slug?: string;

  @ApiProperty({
    example: '16168879784002',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @ApiProperty({
    example: 'en_US',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly locale?: string;
}
export class ProductsFeedDto {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly slug?: string;

  @ApiProperty({
    example: 'Engagement Ring',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly productType?: string;
}

export class ProductByVariantIdInput {
  @ApiProperty({
    example: 12343242345,
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  readonly variantId: number;
}

export class ProductSkusInput {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly collectionSlug: string;
}

export class ProductByContentIdsInput {
  @ApiProperty({
    example: 'contentID1,contentID2',
    required: true,
  })
  @IsString()
  @Type(() => Array)
  readonly ids: string;

  @ApiProperty({
    example: 'de',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly locale: string;
}

export class ProductByProductSlugsInput {
  @ApiProperty({
    example: 'productSlug1,ProductSlug2',
    required: false,
  })
  @IsString()
  @Type(() => Array)
  readonly ids: string;
}
