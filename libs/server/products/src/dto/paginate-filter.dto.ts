import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginateFilterDto {
  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly limit?: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page?: number;

  @ApiProperty({
    example: 'ASC or DESC',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortOrder?: string;

  @ApiProperty({
    example: 'name, id, etc',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly sortBy?: string;

  @ApiProperty({
    example: 'three-stone',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly slug?: string;

  @ApiProperty({
    example: 'Engagement Ring',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly productType?: string;
}
