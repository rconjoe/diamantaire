'use client';

import { useEffect, useState } from 'react';

import { inferSuccessResponse, makeClient } from '../lib/client';
import { HealthEndpoint } from '../lib/endpoints/health';

// TODO: make a matching health thing for pages to match the new makeNextPagesHandler

export function Health() {
  // see api/catalog/lookups/lookupHealthStatus.js LMAOOO jk
  //
  // the self-writing client sdk of lore, in action:
  const client = makeClient(typeof window === 'undefined' ? '' : window.location.origin, HealthEndpoint);
  const [res, setRes] = useState<inferSuccessResponse<typeof client, 'GET'> | null>(null);

  useEffect(() => {
    // r is typesafe :D
    client.GET({}).then((r) => {
      if (r.ok) setRes(r.data);
    });
  }, []);

  // this can be expanded upon too! like suspense etc
  return <div>{res?.message}</div>;
}

export default function HealthPage() {
  return (
    <main>
      <Health />
    </main>
  );
}
