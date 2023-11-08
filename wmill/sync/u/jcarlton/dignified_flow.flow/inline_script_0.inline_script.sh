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
  openai_token=$(curl -s -H "Authorization: Bearer $WM_TOKEN" \
    "$BASE_INTERNAL_URL/api/w/$WM_WORKSPACE/resources/get_value_interpolated/f/openai/windmill_codegen" | tr -d '"')
  stamp=$(date +%Y%m%d%H%M%S)

  export OPENAI_API_KEY=$openai_token.api_key
  echo "set openai key env var to: "
  echo $OPENAI_API_KEY
}

install_deps() {
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
  echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
  sudo apt update && sudo apt install mods
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