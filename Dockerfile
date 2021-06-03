From node:12-alpine

COPY src /src
COPY package.json .
COPY yarn.lock .
RUN yarn
EXPOSE 5001
CMD yarn start