import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PriceDocument = PriceEntity & Document;

@Schema({
  collection: 'prices',
  timestamps: true,
})
export class PriceEntity {
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
