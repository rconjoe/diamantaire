import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import paginate from 'mongoose-paginate-v2';

import { DiamondVariant } from '../interface/diamond.interface';

/**
 * Cut to order Diamonds Entity
 */
@Schema({
  collection: 'cuttoorderdiamonds',
  timestamps: true,
})
@ObjectType()
export class CutToOrderDiamondEntity extends AbstractDocument {
  @Field(() => String)
  @Prop()
  dangerousInternalProductId?: string;

  @Field(() => String)
  @Prop()
  handle?: string;

  @Field(() => String)
  @Prop()
  productTitle?: string;

  @Field(() => String)
  @Prop()
  description?: string;

  @Prop()
  variants?: DiamondVariant[];

  @Field(() => String)
  @Prop()
  dfCertificateUrl?: string;

  @Field(() => String)
  @Prop()
  type?: string;

  @Field(() => Number)
  @Prop()
  carat?: number;

  @Field(() => String)
  @Prop()
  cut?: string;

  @Field(() => String)
  @Prop()
  color?: string;

  @Field(() => String)
  @Prop()
  clarity?: string;

  @Field(() => String)
  @Prop()
  lotId?: string;

  @Field(() => String)
  @Prop({
    type: String,
  })
  diamondType?: string;
}

export const CutToOrderDiamondSchema = SchemaFactory.createForClass(CutToOrderDiamondEntity);
CutToOrderDiamondSchema.plugin(paginate);
