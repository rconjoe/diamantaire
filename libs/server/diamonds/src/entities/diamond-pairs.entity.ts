import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import paginate from 'mongoose-paginate-v2';

@Schema({
  collection: 'diamond-pairs',
  timestamps: true,
})
export class DiamondPairsEntity extends AbstractDocument {
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

export const DiamondPairsSchema = SchemaFactory.createForClass(DiamondPairsEntity);
DiamondPairsSchema.plugin(paginate);
DiamondPairsSchema.plugin(aggregatePaginate);
