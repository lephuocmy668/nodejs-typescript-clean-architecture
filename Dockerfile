FROM node:10.8.0-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python bash && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

WORKDIR /service
ADD ./dist /service

RUN apk add bash \
 && yarn install --production \
 && rm -rf /var/cache/apk/*

EXPOSE 8080
CMD config=./src/config.yml node ./src/index.js