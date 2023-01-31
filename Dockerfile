FROM --platform=$BUILDPLATFORM node:18-alpine as builder

# Build application and add additional files
WORKDIR /vrai-server

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile
RUN yarn global add pm2

COPY ./nx.json nx.json
COPY ./jest.preset.js jest.preset.js
COPY ./jest.config.ts jest.config.ts
COPY ./tsconfig.base.json tsconfig.base.json
COPY ./libs/server libs/server
COPY ./libs/shared libs/shared
COPY ./ecosystem.config.js ecosystem.config.js

COPY ./apps apps

RUN yarn build:server

EXPOSE 3333
ENV NODE_ENV production
CMD ["yarn", "start:prod:pm2"]
