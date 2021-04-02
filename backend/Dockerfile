FROM node:15-alpine

WORKDIR /webid-api

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon --quiet

COPY . . 

EXPOSE 9000

CMD npm start
