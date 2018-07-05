# What image do you want to start building on?
FROM node:latest

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app

RUN npm install --production
EXPOSE 3003

CMD npm run serve