FROM node:16-alpine
ARG API_WORKDIR
WORKDIR ${API_WORKDIR}
ENV TZ Asia/Tokyo
RUN apk update && apk upgrade
RUN apk add wget vim
RUN echo "set encoding=utf-8" >> ~/.vimrc
RUN yarn global add @nestjs/cli
