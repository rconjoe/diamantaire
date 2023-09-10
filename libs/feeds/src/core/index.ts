/* eslint-disable camelcase */
import * as S from '@effect/schema/Schema';
import { Request } from 'effect';

export * from './verifySignatureEdge';

export const FeedEntrySchema = S.struct({
  id: S.number.pipe(S.minLength(10)),
  mpn: S.string.pipe(S.nonEmpty()),
  'Group ID': S.number.pipe(S.minLength(8)),
  title: S.string.pipe(S.nonEmpty()),
  custom_label_0: S.literal('available'),
  custom_label_1: S.never,
  custom_label_2: S.literal('Earrings', 'Bracelet', 'GWP', 'Ring', 'Necklace', 'Wedding Band', 'Accessory', 'Engagement'),
  custom_label_3: S.never,
  description: S.string.pipe(S.nonEmpty()),
  price: S.string,
  availability: S.literal('in_stock'),
  brand: S.literal('Vrai'),
  link: S.string,
  image_link: S.string,
  condition: S.literal('new'),
});

// prettier-ignore
export interface FeedEntry extends S.To<typeof FeedEntrySchema> { }

export class GetFeedEntriesError {
  readonly _tag = 'GetFeedEntriesError';
}

export interface GetFeedEntries extends Request.Request<GetFeedEntriesError, Array<FeedEntry>> {
  readonly _tag: 'GetFeedEntries';
}
export const GetFeedEntries = Request.tagged<GetFeedEntries>('GetFeedEntries');

export interface GetFeedEntryByGID extends Request.Request<GetFeedEntriesError, FeedEntry> {
  readonly _tag: 'GetFeedEntryByGID';
  readonly gid: number;
}
export const GetFeedEntryByGID = Request.tagged<GetFeedEntryByGID>('GetFeedEntryByGID');

export type FeedApiRequest = GetFeedEntries | GetFeedEntryByGID;
