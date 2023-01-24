import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import paginate from 'mongoose-paginate-v2';

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
  @Prop({
    trim: true,
  })
  readonly originalId?: string;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly type?: string;

  @Field(() => Float)
  @Prop({
    trim: true,
  })
  readonly roughWeight?: number;

  @Field(() => Float)
  @Prop({
    trim: true,
  })
  readonly minThickness?: number;

  @Field(() => Float)
  @Prop({
    trim: true,
  })
  readonly width?: number;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly sourceId?: string;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly shape?: string;

  @Field(() => Number)
  @Prop({
    trim: true,
  })
  readonly carat?: number;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly clarity?: string;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly color?: string;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly cut?: string;

  @Field(() => String)
  @Prop({
    trim: true,
  })
  readonly planId?: string;

  @Field(() => Number)
  @Prop({
    trim: true,
  })
  readonly price?: number;

  @Field(() => Boolean)
  @Prop({
    trim: true,
  })
  readonly isAvailable?: boolean;
}

export const CutToOrderDiamondSchema = SchemaFactory.createForClass(CutToOrderDiamondEntity);
CutToOrderDiamondSchema.plugin(paginate);
