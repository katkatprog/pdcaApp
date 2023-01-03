FROM node:16-alpine
ARG API_WORKDIR
WORKDIR ${API_WORKDIR}
ENV TZ="Asia/Tokyo" LANG="ja_JP.UTF-8" LANGUAGE="ja_JP:ja" LC_ALL="ja_JP.UTF-8"
RUN apk update && apk upgrade
RUN apk add vim git
RUN apk add --update --no-cache openssl1.1-compat
RUN yarn global add @nestjs/cli
