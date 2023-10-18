
FROM node:18-alpine3.16 as builder

# Configure Time Zone
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create app directory, Also Holds Applications Source Code
ENV NODE_ENV build

WORKDIR /home/node
COPY package*.json yarn.lock ./

RUN yarn --frozen-lockfile
COPY . .
# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:18-alpine3.16 as production

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder /home/node/package*.json ./
COPY --from=builder /home/node/node_modules/ ./node_modules/
COPY --from=builder /home/node/dist/ ./dist/
COPY --from=builder /home/node/ecosystem.config.js ./ecosystem.config.js

CMD ["yarn", "start:prod:pm2"]