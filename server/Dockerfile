FROM node:19.4

WORKDIR /app

COPY package*.json .

RUN npm install

ENV PORT=3000
ENV ACCESS_TOKEN_SECRET=change_me
ENV REFRESH_TOKEN_SECRET=change_me!