FROM node:13-alpine

LABEL maintainer "Oto <oto.lopes@gmail.com.com>"

RUN npm install -g @vue/cli --loglevel=error

WORKDIR /webid-front

ENV PATH /webid-front/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --loglevel=error

COPY . . 

EXPOSE 8080

CMD npm run serve
