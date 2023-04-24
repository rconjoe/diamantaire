import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { GetDiamondCheckoutDto, ProductInventoryDto } from '../dto/diamond-checkout.dto';
import { GetDiamondByLotIdDto, GetDiamondInput } from '../dto/get-diamond.input';
import { DiamondsService } from '../services/diamond.service';

@Controller('diamonds')
@ApiTags('Diamonds')
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

  @Get('cfy')
  @ApiQuery({ name: 'caratMin', required: false, description: 'carat min' })
  @ApiQuery({ name: 'caratMax', required: false, description: 'carat max' })
  @ApiQuery({ name: 'diamondType', required: false, description: 'diamond type' })
  async fetchCFYDiamonds(@Query() { caratMin, caratMax, diamondType }: GetDiamondInput) {
    return await this.diamondsService.getCFYDiamond({ caratMax, caratMin, diamondType });
  }

  @Get(':lotId')
  @ApiParam({ name: 'lotId', required: true })
  async getDiamondByLotId(@Param() lotId: GetDiamondByLotIdDto) {
    return await this.diamondsService.diamondByLotId(lotId);
  }

  @Get('available/:lotId')
  @ApiParam({ name: 'lotId', required: true })
  async getNSDiamondByLotId(@Param() lotId: GetDiamondCheckoutDto) {
    return await this.diamondsService.fetchDiamondAvailability(lotId);
  }

  @Get('inventory/:id')
  @ApiParam({ name: 'id', required: true })
  async getProductInventory(@Param() { id }: ProductInventoryDto) {
    return await this.diamondsService.getShopifyProductInventory({ id });
  }
}
