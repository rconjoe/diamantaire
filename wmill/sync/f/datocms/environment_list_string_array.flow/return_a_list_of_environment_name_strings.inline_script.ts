type DatoEnvironment = {
  id: string;
  type: string;
  meta: {
    created_at: string;
    status: string;
    primary: boolean;
    read_only_mode: boolean;
    last_data_change_at: string;
    forked_from: string;
  }
}

export async function main(evironments: DatoEnvironment[]) {
  return evironments.map(env => env.id)
}
