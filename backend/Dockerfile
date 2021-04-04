FROM node:15-alpine

LABEL maintainer "Oto <oto.lopes@gmail.com.com>"

WORKDIR /webid-api

COPY package*.json .

RUN npm install --quiet

RUN npm install nodemon --quiet

COPY . . 

EXPOSE 9000

CMD npm start
