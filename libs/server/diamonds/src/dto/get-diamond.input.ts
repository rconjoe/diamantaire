import { isValidBoolean } from '@diamantaire/shared/constants';
import { valueToBoolean } from '@diamantaire/shared/utils';
import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsBoolean, IsIn, IsNotEmpty } from 'class-validator';

import { DiamondEntity } from '../entities/diamond.entity';

/**
 * Schema for querying a diamond
 * DiamondType is a required field
 */
@InputType()
export class GetDiamondDto implements Partial<DiamondEntity> {
  @ApiProperty({
    example: 'oval',
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  diamondType?: string;

  @ApiProperty({
    example: false,
    required: false,
  })
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  @IsIn(isValidBoolean)
  @Transform(({ value }) => valueToBoolean(value))
  @Type(() => Boolean)
  readonly isCto?: boolean;

  @ApiProperty({
    example: 2.0,
    required: false,
  })
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  carat?: number;

  @ApiProperty({
    example: 'H',
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly color?: string;

  @ApiProperty({
    example: 'VS2',
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  clarity?: string;

  @ApiProperty({
    example: 'Excellent',
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly cut?: string;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number;

  @ApiProperty({
    example: 2,
    required: false,
  })
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number;

  @ApiProperty({
    example: 'asc',
    description: 'asc, desc, 0, 1',
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortOrder?: string;

  @ApiProperty({
    example: 'color',
    required: false,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortBy?: string;

  @ApiProperty({
    example: 1200,
    required: false,
  })
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly priceMin?: number;

  @ApiProperty({
    example: 2200,
    required: false,
  })
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly priceMax?: number;

  @ApiProperty({
    example: 2.5,
    required: false,
  })
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly caratMin?: number;

  @ApiProperty({
    example: 3.0,
    required: false,
  })
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly caratMax?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly currencyCode?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly countryCode?: string;
}

export class GetDiamondByLotIdDto {
  @ApiProperty({
    example: 'F700032',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly lotId: string;
}
