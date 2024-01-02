import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Options, Variant } from '../interface/plp.interface';

@Schema({
  collection: 'plp',
  timestamps: true,
})
@ObjectType()
export class PlpEntity extends AbstractDocument {
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

  @Prop({ type: Array(String) })
  styles: string[];

  @Prop({ type: Array(String) })
  subStyles: string[];

  @Prop({ type: Array })
  variants?: Variant[];
}

export const ProductsSchema = SchemaFactory.createForClass(PlpEntity);
ProductsSchema.plugin(mongoosePaginate);
ProductsSchema.plugin(aggregatePaginate);
