# VRAI.com

![ring-sizer-full-width-banner-desktop](https://user-images.githubusercontent.com/48492680/206694479-dc7f2d7f-462b-4554-9c72-b02db45eee01.jpg)

> **diamantaire** (_noun_) /ˌdiːəmɒnˈtɛə(ɹ)/
> A member of a successful diamond-dealing family or group.

---

[![CircleCI](https://dl.circleci.com/insights-snapshot/gh/DiamondFoundry/diamantaire/develop/build-test-deploy/badge.svg?window=24h&circle-token=1f8a3c24cdf0ed082d81a3750b4e33ba1d3b8146)](https://app.circleci.com/insights/github/DiamondFoundry/diamantaire/workflows/build-test-deploy/overview?branch=develop&reporting-window=last-24-hours&insights-snapshot=true)

# Vercel

## Certificate issues
When deploying preview, it appears that Vercel can fail to issue a certificate for the preview domain.  When this happens, you will most likely not be able to visit the site but instead be given a privacy error (https://github.com/vercel/vercel/discussions/7655).  To solve this issue, you can run this command using the vercel cli tool (https://vercel.com/docs/cli):

```vercel --scope vrai cert issue [host]```
example: ```vercel --scope vrai cert issue darkside-main-git-feature-cls-diamond-pdp.vrai.qa```

# Tips

During a rebase, you can skip Husky checks with:
`HUSKY_SKIP_HOOKS=1 git rebase ...`

## Linux Run Steps
To pull latest and start on Linux the following command sequence should work after library changes from the upstream repo:
```
git pull
git checkout [branch]
sudo su
    nvm use
    rm -rf ./node_modules
    pnpm install
    chmod 777 . -R
    exit
nvm use
pnpm start
```

## Run Swagger Locally
To run swagger locally, make sure
```
SWAGGER_PASSWORD=<password> 
``````
is added into .env file

Swagger URL is http://localhost:3333/docs

** On pnpm start, a most current swagger-spec.json will be generated on root folder. We can import this file into postman

