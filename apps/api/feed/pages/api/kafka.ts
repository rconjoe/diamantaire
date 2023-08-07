import { Effect, Config } from 'effect';
import { NextApiRequest, NextApiResponse } from 'next';

class FetchError extends Error {
  public readonly _tag = 'FetchError';
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const program = Effect.gen(function* ($) {
    const [address, user, pass] = yield* $(
      Effect.all([
        Effect.config(Config.string('UPSTASH_KAFKA_REST_URL')),
        Effect.config(Config.string('UPSTASH_KAFKA_REST_USERNAME')),
        Effect.config(Config.string('UPSTASH_KAFKA_REST_PASSWORD')),
      ]),
    );

    const auth = Buffer.from(`${user}:${pass}`).toString('base64');
    const eventData = JSON.stringify(req.body);

    const foo: Effect.Effect<never, FetchError, Response> = Effect.tryPromise({
      try: () =>
        fetch(`${address}/produce/product-config-updated`, {
          method: 'POST',
          headers: { Authorization: `Basic ${auth}` },
          body: JSON.stringify({ value: eventData }),
        }).then((_) => _.json()),
      catch: (err) => new FetchError(`Fetch failed: ${err}`),
    });

    const response = yield* $(foo);

    console.log(response);

    return response;
  });

  Effect.runPromise(program)
    .then((response) => res.status(200).json({ name: 'kafka success', message: response }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

export default handler;
