FROM node:19.4

WORKDIR /app

COPY package*.json .

RUN npm install

ENV PORT=3000
ENV JWT_SECRET=change_me