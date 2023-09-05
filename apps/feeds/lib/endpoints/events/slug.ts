/* eslint-disable camelcase */
// eslint-disable prettier/prettier
import * as S from '@effect/schema/Schema';

import { Endpoint, makePathResolver } from '../../util';

export const SlugEventRequestSchema = S.struct({
  environment: S.literal('sandbox'),
  // https://www.datocms.com/docs/content-management-api/resources/webhook-call
  entity_type: S.literal('item', 'item_type'),
  event_type: S.literal('publish', 'delete'),
  entity: S.struct({
    id: S.string.pipe(S.maxLength(64)),
    type: S.literal('item', 'item_type'),
    attributes: S.struct({
      slug: S.string.pipe(S.maxLength(255)),
      product_type: S.literal(
        'Earrings',
        'Bracelet',
        'GWP',
        'Ring',
        'Necklace',
        'Wedding Band',
        'Accessory',
        'Engagement',
        'Engagement Ring',
      ),
      enabled: S.boolean,
      production: S.boolean,
      updated_at: S.string.pipe(S.maxLength(32)),
      created_at: S.string.pipe(S.maxLength(32)),
    }),
    relationships: S.struct({
      item_type: S.struct({
        data: S.struct({ id: S.string.pipe(S.maxLength(64)), type: S.literal('item', 'item_type') }),
      }),
      creator: S.struct({ data: S.struct({ id: S.string.pipe(S.maxLength(64)), type: S.literal('user') }) }),
    }),
    meta: S.struct({
      created_at: S.string.pipe(S.maxLength(32)),
      updated_at: S.string.pipe(S.maxLength(32)),
      published_at: S.string.pipe(S.maxLength(32)),
      publication_scheduled_at: S.null,
      unpublishing_scheduled_at: S.null,
      first_published_at: S.string.pipe(S.maxLength(32)),
      is_valid: S.boolean,
      is_current_version_valid: S.boolean,
      is_published_version_valid: S.boolean,
      status: S.literal('published', 'draft', 'updated'),
      current_version: S.string.pipe(S.maxLength(64)),
      stage: S.null,
    }),
  }),
});

export const SlugEventEndpoint = {
  path: makePathResolver(S.struct({}), () => '/api/events/slug'),
  methods: {
    POST: {
      auth: false,
      request: SlugEventRequestSchema,
      response: S.struct({
        message: S.string,
      }),
    },
  },
} as const satisfies Endpoint;
