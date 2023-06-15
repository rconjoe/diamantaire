import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import paginate from 'mongoose-paginate-v2';

import { IDiamondCollection, IDiamondVariant } from '../interface/diamond.interface';

@Schema({
  collection: 'diamonds',
  timestamps: true,
})
@ObjectType()
export class DiamondEntity extends AbstractDocument implements IDiamondCollection {
  @Field(() => String)
  @Prop()
  slug: string;

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
  variants?: IDiamondVariant[];

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
  @Prop()
  diamondType?: string;

  @Field(() => Boolean)
  @Prop({ type: Boolean })
  availableForSale?: boolean;
}

export const DiamondSchema = SchemaFactory.createForClass(DiamondEntity);
DiamondSchema.plugin(paginate);
