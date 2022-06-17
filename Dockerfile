# Base image
FROM node:16-alpine as ts-compiler
# Setting working directory
WORKDIR /app
#Set Path /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH
#Coppy package.json and typescript settings in the image
COPY package.json ./
COPY tsconfig.json ./ 
#Install Packages
RUN npm install
# Copy the app
COPY . ./

FROM node:16-alpine as ts-remover

WORKDIR /app

COPY --from=ts-compiler /app/package.json ./
COPY --from=ts-compiler /app/dist ./
RUN npm install --only=production
# Expose app port
EXPOSE 3000

# Starting App
CMD ["node", "dist/src/index.js"]