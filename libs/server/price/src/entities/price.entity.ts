import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export type PriceDocument = PriceEntity & Document;

@Schema({
  collection: 'prices',
  timestamps: true,
})
export class PriceEntity extends AbstractDocument {
  @Prop()
  id?: string;

  @Prop()
  sku?: string;

  @Prop()
  amount?: string;

  @Prop()
  currencyCode?: string;
}

export const PriceSchema = SchemaFactory.createForClass(PriceEntity);
PriceSchema.plugin(paginate);
