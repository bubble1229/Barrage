FROM node:4.1.1
MAINTAINER zsx <zsx@zsxsoft.com> 

## If comment the part of mariadb, then you should uncomment the following line.
## RUN apt-get update

## Install memcached
## RUN apt-get install -y memcached
## EXPOSE 11211

## Main
ENV APP /usr/src/app
RUN mkdir -p ${APP}/
WORKDIR ${APP}/
ADD ./ ./
ADD ./docker/ /docker
RUN chmod +x /docker/*.sh
RUN npm install

## Clean Garbage
RUN npm cache clean
RUN apt-get clean 
RUN rm -rf /var/lib/apt/lists/*

EXPOSE 3000
CMD ["/docker/run.sh"]
