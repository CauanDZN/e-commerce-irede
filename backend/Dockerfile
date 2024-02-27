FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

RUN npm install express pg cors

EXPOSE 3000

CMD ["npm", "run", "dev"]
