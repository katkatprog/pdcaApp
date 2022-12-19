FROM node:16-alpine
ARG API_WORKDIR
WORKDIR ${API_WORKDIR}
ENV TZ Asia/Tokyo
RUN apk update && apk upgrade
RUN apk add vim git 
RUN echo "set encoding=utf-8" >> ~/.vimrc
RUN apk add --update --no-cache openssl1.1-compat
RUN yarn global add @nestjs/cli
