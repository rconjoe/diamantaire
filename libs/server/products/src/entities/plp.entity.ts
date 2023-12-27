import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Options } from '../interface/product.interface';

@Schema({
  collection: 'plp',
  timestamps: true,
})
@ObjectType()
export class PlpEntity extends AbstractDocument {
  @Prop({ type: String })
  slug: string;

  @Prop({ type: Object })
  configuration: Options;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Array(String) })
  subStyles: string[];
}

export const PlpSchema = SchemaFactory.createForClass(PlpEntity);
PlpSchema.plugin(mongoosePaginate);
PlpSchema.plugin(aggregatePaginate);
