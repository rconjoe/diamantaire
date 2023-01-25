import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDiamondCheckoutDto {
  @ApiProperty({
    example: '700032',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly lotId: string;
}
