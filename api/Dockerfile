FROM node:16-alpine
ARG API_WORKDIR
WORKDIR ${API_WORKDIR}
# ENV DOCKERIZE_VERSION v0.6.1
ENV TZ Asia/Tokyo
RUN apk update && apk upgrade
RUN apk add wget vim
RUN echo "set encoding=utf-8" >> ~/.vimrc
RUN yarn global add @nestjs/cli
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz