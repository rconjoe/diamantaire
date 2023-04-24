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
