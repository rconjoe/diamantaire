import { AbstractDocument } from '@diamantaire/server/common/provider/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import paginate from 'mongoose-paginate-v2';

import { IDiamondVariant } from '../interface/diamond.interface';

@Schema({
  collection: 'diamonds',
  timestamps: true,
})
export class DiamondEntity extends AbstractDocument {
  @Prop({ type: String })
  slug: string;

  @Prop({ type: String })
  dangerousInternalProductId?: string;

  @Prop({ type: String })
  dangerousInternalCollectionId: string;

  @Prop({ type: String })
  handle?: string;

  @Prop({ type: String })
  productTitle?: string;

  @Prop({ type: Array })
  variants?: IDiamondVariant[];

  @Prop({ type: String })
  isForSale: boolean;

  @Prop({ type: String })
  variantId: string;

  @Prop({ type: String })
  dangerousInternalShopifyVariantId: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String })
  dfCertificateUrl?: string;

  @Prop()
  type?: string;

  @Prop({ type: Number })
  carat?: number;

  @Prop({ type: String })
  cut?: string;

  @Prop({ type: String })
  color?: string;

  @Prop({ type: String })
  clarity?: string;

  @Prop({ type: String })
  lotId?: string;

  @Prop({ type: String })
  diamondType?: string;

  @Prop({ type: Boolean })
  availableForSale?: boolean;
}

export const DiamondSchema = SchemaFactory.createForClass(DiamondEntity);
DiamondSchema.plugin(paginate);
DiamondSchema.plugin(aggregatePaginate);
