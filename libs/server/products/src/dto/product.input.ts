import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Schema for querying a diamond
 * DiamondType is a required field
 */
@InputType()
export class GetProductInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly handle?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly country?: any;
}

@InputType()
export class ProductVariantInput {
  @ApiProperty({
    example: 'three-stone',
    required: true,
  })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly slug?: string;

  @ApiProperty({
    example: '16168879784002',
    required: true,
  })
  @Field(() => String, { description: 'The variant ID of the product' })
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
}
