import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import paginate from 'mongoose-paginate-v2';

/**
 * Presentment Prices Object
 */
@ObjectType()
class PresentmentPrices {
  @Field(() => String)
  @Prop()
  public amount: string;

  @Field(() => String)
  @Prop()
  public currencyCode: string;
}

/**
 * Diamond Variant Object
 */
@ObjectType()
class VariantDetails {
  @Field(() => Boolean)
  @Prop()
  public isForSale: boolean;

  @Field(() => String)
  @Prop()
  public variantSku: string;

  @Field(() => String)
  @Prop()
  public variantId: string;

  @Field(() => String)
  @Prop()
  public dangerousInternalShopifyVariantId: string;

  @Field(() => String)
  @Prop()
  public variantTitle: string;

  @Field(() => Number)
  @Prop()
  public price: number;

  @Field(() => [PresentmentPrices])
  @Prop()
  public presentmentPrices: PresentmentPrices[];

  @Field(() => String)
  @Prop()
  public title: string;
}

/**
 * Object attached to the diamond variant
 */
@ObjectType()
class AllVariants {
  @Field(() => [VariantDetails])
  @Prop()
  public all: VariantDetails[];
}

/**
 * Pagination Object
 */
@ObjectType()
export class Pagination {
  @Field(() => Number)
  @Prop()
  public total: number;

  @Field(() => Number)
  @Prop()
  public page: number;

  @Field(() => Number)
  @Prop()
  public limit: number;
}

/**
 * Range Object
 */
@ObjectType()
export class MinMaxPrice {
  @Field(() => PresentmentPrices)
  @Prop()
  public min: PresentmentPrices;

  @Field(() => PresentmentPrices)
  @Prop()
  public max: PresentmentPrices;
}

@ObjectType()
export class MinMaxCarat {
  @Field(() => String)
  @Prop()
  public min: string;

  @Field(() => String)
  @Prop()
  public max: string;
}

@ObjectType()
export class Range {
  @Field(() => MinMaxPrice)
  @Prop()
  public price: MinMaxPrice;

  @Field(() => MinMaxCarat)
  @Prop()
  public carat: MinMaxCarat;
}

/**
 * Diamond List Object
 */
@ObjectType()
export class DiamondsList {
  @Field(() => Pagination)
  @Prop()
  public pagination: Pagination;

  @Field(() => Range)
  @Prop()
  public range: Range;

  @Field(() => [DiamondEntity])
  @Prop()
  public diamonds: DiamondEntity[];
}

/**
 * Diamonds Array
 */
@Schema({
  collection: 'diamonds',
  timestamps: true,
})
@ObjectType()
export class DiamondEntity extends AbstractDocument {
  @Field(() => String)
  @Prop()
  public handle: string;

  @Field(() => String)
  @Prop()
  public productTitle: string;

  @Field(() => String)
  @Prop()
  public description?: string;

  @Field(() => AllVariants)
  @Prop()
  public variants?: AllVariants;

  @Field(() => String)
  @Prop()
  public dfCertificateUrl: string;

  @Field(() => String)
  @Prop()
  public carat: string;

  @Field(() => String)
  @Prop()
  public cut: string;

  @Field(() => String)
  @Prop()
  public color: string;

  @Field(() => String)
  @Prop()
  public clarity: string;

  @Field(() => String)
  @Prop()
  public lotId: string;

  @Field(() => String, { description: 'Diamond Shape' })
  @Prop()
  public diamondType: string;
}

export const DiamondSchema = SchemaFactory.createForClass(DiamondEntity);
DiamondSchema.plugin(paginate);
