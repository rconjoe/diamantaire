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

export class PlpInput {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly slug?: string;

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
