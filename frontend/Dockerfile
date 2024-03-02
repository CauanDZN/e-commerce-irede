FROM node:latest as build

WORKDIR /app

COPY . .

RUN npm install -g npm@10.5.0

RUN npm install

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
