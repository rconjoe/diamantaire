import { Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Field(() => ID)
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
