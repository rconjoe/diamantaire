/**
 * Shopify Controller class
 * @file shopify.controller.ts
 * @author: Bismark Frimpong
 * @date 11/23/2022
 * @version 1.0
 */

import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GetDiamondTypeDto } from '../dto/get-diamondtype.dto';
import { DiamondLoaderService } from '../services/diamond-loader.service';

@Controller('load')
@ApiTags('Loader')
export class DiamondLoaderController {
  constructor(private readonly diamondLoaderService: DiamondLoaderService) {}

  @Get('diamonds')
  async loadDiamondCollection(@Res() response: Response, @Query() { diamondType }: GetDiamondTypeDto) {
    response.json({
      message: 'Loading diamond collection data from Shopify. This may take a while. Please check the logs for progress.',
    });

    return await this.diamondLoaderService.loadDiamonds(diamondType);
  }
}
