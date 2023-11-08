import * as wmill from "windmill-client"
import { buildClient } from "@datocms/cma-client-node";

const token = await wmill.getVariable('f/datocms/cma_token');
const client = buildClient({ apiToken: token });

export async function main() {
  try {
    const environments = await client.environments.list();
    return environments
  } catch (error) {
    console.error(error);
  }
}
