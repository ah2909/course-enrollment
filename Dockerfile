FROM node:24-alpine3.21

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p ./data && chmod -R 666 ./data

EXPOSE 3000