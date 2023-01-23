import { Field, Int, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

import { ProductCollection } from '../interface/product.interface';

@ObjectType()
// class Price {
//   @Field(() => String)
//   @Prop()
//   amount?: string;

//   @Field(() => String)
//   @Prop()
//   currencyCode?: string;
// }

@ObjectType()
class Options {
  @Field(() => String)
  @Prop()
  metal?: string;

  @Field(() => String)
  @Prop()
  bandAccent?: string;

  @Field(() => String)
  @Prop()
  diamondType?: string;

  @Field(() => String)
  @Prop()
  sideStoneCarat?: string;

  @Field(() => String)
  @Prop()
  sideStoneShape?: string;

  @Field(() => String)
  @Prop()
  goldPurity?: string;

  @Field(() => String)
  @Prop()
  ringSize?: string;
}

@ObjectType()
class Variant {
  @Field(() => String)
  @Prop()
  shopifyProductHandle?: string;

  @Field(() => String)
  @Prop()
  shopifyProductTitle?: string;

  @Field(() => String)
  @Prop()
  id?: string;

  @Field(() => String)
  @Prop()
  sku?: string;

  @Field(() => String)
  @Prop()
  title?: string;

  @Field(() => Boolean)
  @Prop()
  availableForSale?: boolean;

  //   @Field(() => Price)
  //   @Prop()
  //   price?: Price;

  @Field(() => Int)
  @Prop()
  quantityAvailable?: number;

  @Field(() => Options)
  @Prop()
  options?: Options;
}

@Schema({
  collection: 'products',
  timestamps: true,
})
@ObjectType()
export class ProductEntity implements ProductCollection {
  @Field(() => ID)
  @Prop()
  readonly _id?: ObjectId;

  @Field(() => String)
  @Prop()
  handle?: string;

  @Field(() => String)
  @Prop()
  productTitle?: string;

  @Field(() => String)
  @Prop()
  dangerousInternalCollectionId?: string;

  @Field(() => String)
  @Prop()
  slug?: string;

  @Field(() => String)
  @Prop()
  productType?: string;

  @Field(() => String)
  @Prop()
  dangerousInternalProductId?: string;

  @Field(() => String)
  @Prop()
  description?: string;

  @Field(() => [Variant])
  @Prop()
  variants?: Variant[];
}

export const ProductsSchema = SchemaFactory.createForClass(ProductEntity);
