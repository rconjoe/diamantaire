import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { GetDiamondCheckoutDto, ProductInventoryDto } from '../dto/diamond-checkout.dto';
import { GetDiamondByLotIdDto, GetDiamondDto } from '../dto/get-diamond.input';
import { DiamondsService } from '../services/diamond.service';

@Controller('diamonds')
@ApiTags('Diamonds')
@ApiHeader({ name: 'x-api-key', required: true })
export class DiamondsController {
  constructor(private readonly diamondsService: DiamondsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all diamond types' })
  async fetchDiamonds(
    @Query()
    {
      limit,
      page,
      sortBy,
      sortOrder,
      diamondType,
      color,
      clarity,
      cut,
      caratMin,
      caratMax,
      priceMin,
      priceMax,
      isCto,
    }: GetDiamondDto,
  ) {
    return await this.diamondsService.getDiamonds({
      limit,
      page,
      sortBy,
      sortOrder,
      diamondType,
      color,
      clarity,
      cut,
      caratMin,
      caratMax,
      priceMin,
      priceMax,
      isCto,
    });
  }

  @Get('cfy')
  @ApiOperation({ summary: 'Get CFY diamonds by type' })
  async fetchCFYDiamonds(@Query() { carat, caratMin, caratMax, diamondType }: GetDiamondDto) {
    return await this.diamondsService.getCFYDiamond({ carat, caratMax, caratMin, diamondType });
  }

  @Get(':lotId')
  @ApiOperation({ summary: 'Get single diamond by lotId' })
  @ApiParam({ name: 'lotId', required: true })
  async getDiamondByLotId(@Param() lotId: GetDiamondByLotIdDto) {
    return await this.diamondsService.diamondByLotId(lotId);
  }

  @Get('available/:lotId')
  @ApiOperation({ summary: 'Get diamond availablity from Netsuite' })
  @ApiParam({ name: 'lotId', required: true })
  async getNSDiamondByLotId(@Param() lotId: GetDiamondCheckoutDto) {
    return await this.diamondsService.fetchDiamondAvailability(lotId);
  }

  @Get('inventory/:id')
  @ApiOperation({ summary: 'Get product inventory from shopify' })
  @ApiParam({ name: 'id', required: true })
  async getProductInventory(@Param() { id }: ProductInventoryDto) {
    return await this.diamondsService.getShopifyProductInventory({ id });
  }
}
