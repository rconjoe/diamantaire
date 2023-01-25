import { InputType, Field, Int, Float } from '@nestjs/graphql';
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
  readonly limit?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly page?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly priceMin?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly priceMax?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly caratMin?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly caratMax?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly currencyCode?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly sortOrder?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly sortBy?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly countryCode?: string;
}
