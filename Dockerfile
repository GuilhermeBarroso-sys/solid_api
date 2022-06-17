FROM node:16-alpine as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:16-alpine as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/prisma ./
COPY --from=ts-compiler /usr/app/.env ./
COPY --from=ts-compiler /usr/app/build ./build

RUN npm install --only=production
EXPOSE 3000
CMD  ["npm", "run", "start"]