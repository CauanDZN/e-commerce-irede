FROM postgres:latest

COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod +r /docker-entrypoint-initdb.d/init.sql

RUN chmod 777 /docker-entrypoint-initdb.d/