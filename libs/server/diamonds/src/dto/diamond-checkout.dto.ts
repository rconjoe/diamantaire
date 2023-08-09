import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetDiamondCheckoutDto {
  @ApiProperty({
    example: '700032',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly lotId: string;
}

export class ProductInventoryDto {
  @ApiProperty({
    example: 43120246489181,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly id: number;
}

export class LowestPricedDto {
  @ApiProperty({
    example: 'round-brilliant',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly diamondType: string;
}

export class DiamondPlp {
  @ApiProperty({
    example: 'oval-cut-diamonds',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly slug: string;

  @ApiProperty({
    example: 'round-brilliant',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly diamondType: string;

  @ApiProperty({
    example: 'Fancy Intense Pink',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly color: string;
}
