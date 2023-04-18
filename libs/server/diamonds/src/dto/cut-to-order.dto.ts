import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CutToOrderDiamondEntity } from '../entities/cut-to-order.entity';

/**
 * Cut to order diamonds DTOs
 */
@InputType()
export class GetCutToOrderDiamondInput implements Partial<CutToOrderDiamondEntity> {
  @ApiProperty({
    example: 'trillion',
    required: true,
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly diamondType?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  carat?: number;

  @ApiProperty({
    example: 1.4,
    required: false,
  })
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly caratMin?: number;

  @ApiProperty({
    example: 3.1,
    required: false,
  })
  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly caratMax?: number;

  @ApiProperty({
    example: 9000,
    required: false,
  })
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly priceMin?: number;

  @ApiProperty({
    example: 10000,
    required: false,
  })
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
