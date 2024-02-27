import { UtilService } from '@diamantaire/server/common/utils';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, Model, connect } from 'mongoose';

import { PlpEntity, PlpSchema } from '../../entities/plp.entity';
import { ProductEntity, ProductsSchema } from '../../entities/product.entity';
import { PlpRepository } from '../../repository/plp.repository';
import { ProductRepository } from '../../repository/product.repository';
import { ProductsService } from '../../services/product.service';

describe("getPlpProducts", () => {
  let productsService: ProductsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  let productsModel: Model<ProductEntity>;
  let plpModel: Model<PlpEntity>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;
    productsModel = mongoConnection.model('products', ProductsSchema);
    plpModel = mongoConnection.model("plp", PlpSchema)

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory:
          () => ({
            uri:uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            autoCreate: true,
          })
        }),
      ],
      providers: [
        ProductsService,
        ProductRepository,
        PlpRepository,
        UtilService,
        { provide: CACHE_MANAGER, useValue: {} },
        {
          provide: getModelToken('products'), useValue: productsModel
        },
        {
          provide: getModelToken('plp'), useValue: plpModel
        },
      ],
    }).compile()

    productsService = moduleRef.get<ProductsService>(ProductsService)
  })

  it("Generates a different cache key depending on sort order", () => {
    const filters = {
      metals: ["Platinum"],
      styles: ["Bezel", "Floral"],
      priceMin: 500,
      priceMax: 1500,
      diamondTypes: ["princess", "pear"],
      subStyles: undefined
    };

    const slug = "bracelets";
    const locale = "en-US";
    const limit = 12;
    const page = 1;
    const sortBy = "price";
    const sortOrder = "asc";

    const sortingCacheKey = productsService.generatePlpCacheKey(sortBy, sortOrder, slug, limit, page, filters, locale);
    const nonSortingCacheKey = productsService.generatePlpCacheKey(undefined, sortOrder, slug, limit, page, filters, locale);

    expect(sortingCacheKey).toBe("plp-data:bracelets:limit=12-page=1:diamondTypes=princess,pear-metals=Platinum-priceMax=1500-priceMin=500-styles=Bezel,Floral:en_US:soted=price_asc");
    expect(nonSortingCacheKey).toBe("plp-data:bracelets:limit=12-page=1:diamondTypes=princess,pear-metals=Platinum-priceMax=1500-priceMin=500-styles=Bezel,Floral:en_US");
  })
})
