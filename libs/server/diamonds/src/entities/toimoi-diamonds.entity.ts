import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import paginate from 'mongoose-paginate-v2';

@Schema({
  collection: 'toimoi-diamonds',
  timestamps: true,
})
export class ToiMoiDiamondsEntity extends AbstractDocument {
  @Prop({ type: Number })
  carat: number;

  @Prop({ type: String })
  cut: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: String })
  clarity: string;

  @Prop({ type: String })
  diamondType: string;

  @Prop({ type: Number })
  price: number;
}

export const ToiMoiDiamondsSchema = SchemaFactory.createForClass(ToiMoiDiamondsEntity);
ToiMoiDiamondsSchema.plugin(paginate);
ToiMoiDiamondsSchema.plugin(aggregatePaginate);
