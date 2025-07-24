FROM node:22

WORKDIR /backend-deem
COPY package.json .
RUN npm install
COPY . .
CMD npm run start:api


