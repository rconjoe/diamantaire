import { isValidBoolean } from '@diamantaire/shared/constants';
import { valueToBoolean } from '@diamantaire/shared/utils';
import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  @IsIn(isValidBoolean)
  @Transform(({ value }) => valueToBoolean(value))
  @Type(() => Boolean)
  readonly isCto?: boolean;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly carat?: number;

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

export class GetDiamondByLotIdDto {
  @ApiProperty({
    example: 'F700032',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly lotId: string;
}
