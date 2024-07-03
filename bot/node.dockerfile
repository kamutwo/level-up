# FROM node:latest AS base
FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN yarn install

COPY . /app

# FROM base as build
# WORKDIR /bot

RUN yarn build

# # FROM base as run
# # WORKDIR /bot

CMD ["yarn", "start"]