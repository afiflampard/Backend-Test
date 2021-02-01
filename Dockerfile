FROM node:lts-alpine

RUN apk add tzdata

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

RUN yarn global add sequelize-cli

COPY --chown=node package*.json ./
COPY --chown=node yarn.lock ./

RUN yarn

COPY --chown=node . .

RUN yarn build

RUN cp .env.example .env

EXPOSE 4002

ENV TZ=Asia/Jakarta

CMD ["yarn","start"]