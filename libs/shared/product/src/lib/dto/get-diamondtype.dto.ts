import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class GetDiamondTypeDto {
  @ApiProperty({
    example: 'oval',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly diamondType?: string;
}
