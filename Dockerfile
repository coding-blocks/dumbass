FROM node:12-alpine

WORKDIR /usr/src/dumbass

COPY package.json .
RUN yarn

COPY . .

EXPOSE 5001

CMD ["yarn", "start"]