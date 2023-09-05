/* eslint-disable camelcase */
import * as S from '@effect/schema/Schema';

import { Endpoint, makePathResolver } from '../../util';

export const SlugEventEndpoint = {
  path: makePathResolver(S.struct({}), () => '/api/events/slug'),
  methods: {
    POST: {
      auth: false,
      request: S.struct({
        event_type: S.literal('publish', 'delete'),
      }),
      response: S.struct({
        message: S.string,
      }),
    },
  },
} as const satisfies Endpoint;
