import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { DiamondEntity } from '../entities/diamond.entity';

/**
 * Schema for querying a diamond
 * DiamondType is a required field
 */
@InputType()
export class GetDiamondInput implements Partial<DiamondEntity> {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly diamondType?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  carat?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly color?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly clarity?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly cut?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortOrder?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortBy?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly priceMin?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly priceMax?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly caratMin?: number;

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
