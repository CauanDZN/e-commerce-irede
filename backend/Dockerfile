FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g npm@10.5.0

RUN npm install

RUN npm install express pg cors

EXPOSE 3000

CMD ["npm", "run", "dev"]
