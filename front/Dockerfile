FROM node:16-alpine
ARG FRONT_WORKDIR
WORKDIR ${FRONT_WORKDIR}
ENV TZ Asia/Tokyo
RUN apk update && apk upgrade
RUN apk add wget vim
RUN echo "set encoding=utf-8" >> ~/.vimrc
