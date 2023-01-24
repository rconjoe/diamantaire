import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

import { GetCutToOrderDiamondInput } from '../dto/cut-to-order.dto';
import { GetDiamondCheckoutDto } from '../dto/diamond-checkout.dto';
import { DiamondsService } from '../services/diamond.service';

@Controller('diamonds')
export class DiamondsController {
  constructor(private readonly diamondsService: DiamondsService) {}

  @Post('cutToOrder')
  @HttpCode(200)
  @ApiQuery({ name: 'limit', required: false, description: 'number of products per page' })
  @ApiQuery({ name: 'page', required: false, description: 'page number' })
  @ApiBody({ type: GetCutToOrderDiamondInput })
  async fetchDiamondCutToOrder(
    @Body() cutToOrderDto: GetCutToOrderDiamondInput,
    @Query() { limit, page }: GetCutToOrderDiamondInput,
  ) {
    return await this.diamondsService.getCutToOrderDiamondAvailability(cutToOrderDto, { limit, page });
  }

  @Get(':lotId')
  @ApiParam({ name: 'lotId', required: true })
  async getDiamondByLotId(@Param() lotId: GetDiamondCheckoutDto) {
    return await this.diamondsService.fetchDiamondAvailability(lotId);
  }
}
