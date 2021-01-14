FROM node:12.18.3-alpine
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 5000
ENTRYPOINT ["yarn", "prod"]
