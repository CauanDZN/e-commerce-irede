FROM node:latest

WORKDIR /app

COPY . .

RUN npm install express pg cors bcrypt jsonwebtoken

EXPOSE 3000

CMD ["npm", "run", "dev"]
