FROM node:latest

WORKDIR /app

COPY . .

RUN npm i express pg cors bcrypt jsonwebtoken swagger-ui-express

RUN npm i --save-dev swagger-autogen

EXPOSE 3000

CMD ["npm", "run", "swagger"]
