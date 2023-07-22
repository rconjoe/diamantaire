import { Effect, Config } from 'effect';

const handler = (req, res) => {
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

    const response = yield* $(
      Effect.tryPromise({
        try: () =>
          fetch(`${address}/produce/repo-events`, {
            method: 'POST',
            headers: { Authorization: `Basic ${auth}` },
            body: JSON.stringify({ value: eventData }),
          }).then((_) => _.json()),
        catch: (err) => new Error(`Fetch failed: ${err}`),
      }),
    );

    console.log(response);

    return response;
  });

  Effect.runPromise(program)
    .then((response) => res.status(200).json({ name: 'kafka success', message: response }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

export default handler;
