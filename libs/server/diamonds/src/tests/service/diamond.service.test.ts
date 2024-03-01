import { UtilService } from "@diamantaire/server/common/utils";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, Model, connect } from 'mongoose';

import { DiamondPairsEntity, DiamondPairsSchema } from "../../entities/diamond-pairs.entity";
import { DiamondEntity, DiamondSchema } from "../../entities/diamond.entity";
import { SortOption, SortOrder, SortBy } from "../../entities/sort-options.entity";
import { ToiMoiDiamondsEntity, ToiMoiDiamondsSchema } from "../../entities/toimoi-diamonds.entity";
import { DiamondPairsRepository } from "../../repository/diamond-pairs.repository";
import { DiamondRepository } from "../../repository/diamond.repository";
import { ToiMoiDiamondsRepository } from "../../repository/toimoi-diamonds.repository";
import { DiamondsService } from "../../services/diamond.service";


describe("getDiamonds", () => {
  let diamondsService: DiamondsService
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let diamondsModel: Model<DiamondEntity>;
  let diamondPairsModel: Model<DiamondPairsEntity>;
  let toiMoiDiamondsModel: Model<ToiMoiDiamondsEntity>;

  const COLOR_DESC = new SortOption(
    SortBy.COLOR,
    SortOrder.DESC
  );
  const CARAT_DESC = new SortOption(
    SortBy.CARAT,
    SortOrder.DESC
  );

  const DEFAULT_ORDER: SortOption[] = [COLOR_DESC, CARAT_DESC];

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;

    diamondsModel = mongoConnection.model("diamonds", DiamondSchema);
    diamondPairsModel = mongoConnection.model("diamond-pairs", DiamondPairsSchema);
    toiMoiDiamondsModel = mongoConnection.model("toimoi-diamonds", ToiMoiDiamondsSchema);

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory:
            () => ({
              uri: uri,
              useNewUrlParser: true,
              useUnifiedTopology: true,
              serverSelectionTimeoutMS: 5000,
              autoCreate: true,
            })
        }),
      ],
      providers: [DiamondsService,
        DiamondRepository,
        DiamondPairsRepository,
        ToiMoiDiamondsRepository,
        UtilService,
        { provide: CACHE_MANAGER, useValue: {} },
        {
          provide: getModelToken("diamonds"), useValue: diamondsModel
        },
        {
          provide: getModelToken("diamond-pairs"), useValue: diamondPairsModel
        },
        {
          provide: getModelToken("toimoi-diamonds"), useValue: toiMoiDiamondsModel
        },

      ],
    }).compile();

    diamondsService = moduleRef.get<DiamondsService>(DiamondsService);

  })
  it("Can switch order of the first element", () => {
    const colorAsc = new SortOption(
      SortBy.COLOR, SortOrder.ASC
    );
    const ExpectedOrder = [colorAsc, CARAT_DESC];
    const newOrder = diamondsService.assmebleSortKey(colorAsc, DEFAULT_ORDER);

    expect(newOrder).toStrictEqual(ExpectedOrder);
  });
  it("Can switch order of another element", () => {
    const caratAsc = new SortOption(
      SortBy.CARAT, SortOrder.ASC
    );
    const ExpectedOrder = [caratAsc, COLOR_DESC];
    const newOrder = diamondsService.assmebleSortKey(caratAsc, DEFAULT_ORDER);

    expect(newOrder).toStrictEqual(ExpectedOrder);

  })

  it("Can add a new element", () => {
    const priceDesc = new SortOption(
      SortBy.PRICE, SortOrder.DESC
    );
    const ExpectedOrder = [priceDesc, COLOR_DESC, CARAT_DESC];
    const newOrder = diamondsService.assmebleSortKey(priceDesc, DEFAULT_ORDER);

    expect(newOrder).toStrictEqual(ExpectedOrder);
  })

  it("Can convert a SortOption with special sorting to mongo payload", () => {
    const mongoPayload = diamondsService.generateMongoSortPayload([COLOR_DESC]);
    const expectedPayload = [
      {
        "$addFields":
        {
          "color_order":
          {
            "$indexOfArray": [
              ["L", "K", "J", "I", "H", "G", "F", "E", "D"],
              "$color"]
          }
        }
      },
      { "$sort": { "color_order": -1 } }]

    expect(mongoPayload).toStrictEqual(expectedPayload);
  })

  it("Can convert a SortOption without special sorting to mongo payload", () => {
    const mongoPayload = diamondsService.generateMongoSortPayload([CARAT_DESC]);
    const expectedPayload =[ { '$sort': { carat: -1 } } ];

    expect(mongoPayload).toStrictEqual(expectedPayload);
  });

  it("Can convert multiple SortOptions to mong payload", () => {
    const mongoPayload = diamondsService.generateMongoSortPayload(DEFAULT_ORDER);
    const expectedPayload =[
      {
        "$addFields":
        {
          "color_order":
          {
            "$indexOfArray": [
              ["L", "K", "J", "I", "H", "G", "F", "E", "D"],
              "$color"]
          }
        }
      },
      { "$sort": { "color_order": -1, "carat": -1 } }]

    expect(mongoPayload).toStrictEqual(expectedPayload);
  })
})
