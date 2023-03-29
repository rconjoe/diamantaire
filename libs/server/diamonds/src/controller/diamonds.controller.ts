import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

import { GetCutToOrderDiamondInput } from '../dto/cut-to-order.dto';
import { GetDiamondCheckoutDto } from '../dto/diamond-checkout.dto';
import { GetDiamondByLotIdDto, GetDiamondInput } from '../dto/get-diamond.input';
import { DiamondsService } from '../services/diamond.service';

@Controller('diamonds')
export class DiamondsController {
  constructor(private readonly diamondsService: DiamondsService) {}

  @Post()
  @HttpCode(200)
  @ApiQuery({ name: 'limit', required: false, description: 'number of products per page' })
  @ApiQuery({ name: 'page', required: false, description: 'page number' })
  @ApiBody({ type: GetDiamondInput })
  async fetchDiamonds(
    @Body() diamondsDto: GetDiamondInput,
    @Query() { limit, page, sortBy, sortOrder }: GetDiamondInput,
    @Query() { isCto }: GetDiamondInput,
  ) {
    return await this.diamondsService.getDiamonds(diamondsDto, { limit, page, sortBy, sortOrder }, { isCto });
  }

  @Get(':sku')
  @ApiParam({ name: 'sku', required: true })
  async getDiamondByLotId(@Param() sku: GetDiamondByLotIdDto) {
    return await this.diamondsService.diamondByLotId(sku);
  }

  @Post('cutToOrder')
  @HttpCode(200)
  @ApiQuery({ name: 'limit', required: false, description: 'number of products per page' })
  @ApiQuery({ name: 'page', required: false, description: 'page number' })
  @ApiBody({ type: GetCutToOrderDiamondInput })
  async fetchDiamondCutToOrder(
    @Body() cutToOrderDto: GetCutToOrderDiamondInput,
    @Query() { limit, page, sortBy, sortOrder }: GetCutToOrderDiamondInput,
  ) {
    return await this.diamondsService.getCutToOrderDiamondAvailability(cutToOrderDto, { limit, page, sortBy, sortOrder });
  }

  @Get(':lotId')
  @ApiParam({ name: 'lotId', required: true })
  async getNSDiamondByLotId(@Param() lotId: GetDiamondCheckoutDto) {
    return await this.diamondsService.fetchDiamondAvailability(lotId);
  }
}
