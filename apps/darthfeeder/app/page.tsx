'use client';

import React, { useEffect, useState } from 'react';

import { inferSuccessResponse, makeClient } from '../lib/client';
import { HealthEndpoint } from '../lib/endpoints/health';

// TODO: make a matching health thing for pages to match the new makeNextPagesHandler

function Health() {
  // see api/catalog/lookups/lookupHealthStatus.js LMAOOO jk
  //
  // notice how the route of whatever page we are on is not coupled to the backend paths at all.
  // so this makeClient() call actually encapsulates a crazy amount of what vno-site called
  // "universal routes" and "route builders", all in a single line of code.
  //
  // this is another great point to think about this new system intuitively, so.. to reiterate -
  // you have made the EndpointDefinitions, so this client is written by autocomplete, much like the
  // accompanying controllers/handlers on the server. these new powers in TS come from the fact that
  // libraries like zod/effect-ts etc take our static types (which dont do anything and get compiled out)
  // and make type descriptors actually be functions that run and do things in the runtime world.
  //
  // `name: string;` is no longer a `string;` but instead something like zod.string() or Schema.string()....
  // so if theyre functions, not type descriptors, what do these functions do when they run?   :)
  //
  // -------
  //
  // the self-writing client sdk of lore, in action:
  const client = makeClient(typeof window === 'undefined' ? '' : window.location.origin, HealthEndpoint);
  const [res, setRes] = useState<inferSuccessResponse<typeof client, 'GET'> | null>(null);

  useEffect(() => {
    // even r is typesafe :D
    client.GET({}).then((r) => {
      if (r.ok) setRes(r.data);
    });
    // react is literally a meme:
    // https://react.dev/learn/removing-effect-dependencies#why-is-suppressing-the-dependency-linter-so-dangerous
    // https://react.dev/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means
  }, []);
  // ^^^ lol

  // this can be expanded upon too! like suspense etc
  return <div>{res?.message}</div>;
}

export default function Page() {
  return (
    <main>
      <Health />
    </main>
  );
}
