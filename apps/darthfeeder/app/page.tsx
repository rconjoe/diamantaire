'use client';

import { HealthEndpoint } from '@diamantaire/feeds';
import { inferClientSuccessResponse, makeClient } from '@diamantaire/lapidary';
import React, { useEffect, useState } from 'react';

// this whole page is huge and a lot to digest, but unfortunately, is really important and relevant all over in react:
// https://react.dev/learn/removing-effect-dependencies#why-is-suppressing-the-dependency-linter-so-dangerous
// of course the react docs are literally sassy about it "if its not a dependency, prove it" lol
// so (per react docs) we move client dependency here, which isn't really a solution, but the linter stops complaining.
const client = makeClient(typeof window === 'undefined' ? '' : window.location.origin, HealthEndpoint);

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
  const [res, setRes] = useState<inferClientSuccessResponse<typeof client, 'GET'> | null>(null);

  useEffect(() => {
    // even r is typesafe :D
    client.GET({}).then((r) => {
      if (r.ok) setRes(r.data);
    });
    // https://react.dev/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means
  }, []);

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
