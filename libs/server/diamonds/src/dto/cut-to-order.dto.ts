import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CutToOrderDiamondEntity } from '../entities/cut-to-order.entity';

/**
 * Cut to order diamonds DTOs
 */
@InputType()
export class GetCutToOrderDiamondInput implements Partial<CutToOrderDiamondEntity> {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  type?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  carat?: number;

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

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price?: number;

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
}
