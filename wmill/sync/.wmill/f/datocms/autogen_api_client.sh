#!/bin/bash

set -euo pipefail

fail() {
  echo "failed somewhere around:";
  echo $1;
  exit 1;
}

setup_env() {
  # environment="${1:-}"
  token=$(curl -s -H "Authorization: Bearer $WM_TOKEN" \
    "$BASE_INTERNAL_URL/api/w/$WM_WORKSPACE/variables/get_value/u/jcarlton/gihtub_token" | tr -d '"')
  datokey=$(curl -s -H "Authorization: Bearer $WM_TOKEN" \
    "$BASE_INTERNAL_URL/api/w/$WM_WORKSPACE/variables/get_value/f/datocms/gql_token" | tr -d '"')
  stamp=$(date +%Y%m%d%H%M%S)
  branch=datocms/clientlibs-$stamp
  runlink=https://windmill.vrai.dev/run/$WM_JOB_ID?workspace=diamantaire
}

install_deps() {
  echo "Installing npm with apt..."
  apt install npm -y || fail "apt install npm"
  echo "Installing @genql/cli..."
  npm i -g @genql/cli || fail "failed installing genql cli..."
}

clone() {
  echo "Cloning repository..."
  git clone https://$token@github.com/diamondfoundry/diamantaire.git || fail "cloning repo"
  cd diamantaire

  echo "Setting some git parameters..."
  git config user.email jcarlton@vrai.com
  git config user.name automated

  echo "Checking out to new branch:"
  echo $branch
  git checkout -b $branch
}

generate() {
  echo "Generating diamantaire DatoCMS client library..."
  genql -e https://graphql.datocms.com \
    -o ./libs/_generated/datocms/src \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $datokey" \
    -S "BooleanType:boolean" \
    -S "CustomData:Record<string,unknown>" \
    -S "Date:string" \
    -S "DateTime:string" \
    -S "FloatType:number" \
    -S "ItemId:string" \
    -S "IntType:number" \
    -S "JsonField:unknown" \
    -S "MetaTagAttributes:Record<string,string>" \
    -S "UploadId:string" || fail "failed while running genql";
}

push() {
  echo "Pushing changes..."
  git commit -a -m "Automated library regen" || fail "git commit..."; 
  git push -u origin $branch || fail "could not git push...";
}

open_pr() {
  echo "Opening pull request..."
  curl -L \
    -X POST \
    -H "Authorization: Token $token" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/repos/DiamondFoundry/diamantaire/pulls \
    -d '{"title": "'"$branch"'","head":"'"$branch"'","base": "develop","body": "This process is automated. [Logs]('"$runlink"')"}' || fail 'error opening pr'
}

setup_env || fail "setup_env failed"
install_deps
clone
generate
push
open_pr
echo "All done. This was built by @rconjoe <jcarlton@vrai.com>"


