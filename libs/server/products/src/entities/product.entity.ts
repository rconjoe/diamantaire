import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import paginate from 'mongoose-paginate-v2';

import { Options, Variant } from '../interface/product.interface';
@Schema({
  collection: 'products',
  timestamps: true,
})
@ObjectType()
export class ProductEntity extends AbstractDocument {
  @Prop({ type: String })
  contentId: string;

  @Prop({ type: String })
  collectionTitle: string;

  @Prop({ type: Object })
  configuration: Options;

  @Prop({ type: String })
  collectionSlug: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String })
  productSlug?: string;

  @Prop({ type: String })
  productType: string;

  @Prop({ type: String })
  productTitle?: string;

  @Prop({ type: String })
  shopifyCollectionId?: string;

  @Prop({ type: String })
  shopifyProductId?: string;

  @Prop({ type: Array })
  variants?: Variant[];
}

export const ProductsSchema = SchemaFactory.createForClass(ProductEntity);
ProductsSchema.plugin(paginate);
