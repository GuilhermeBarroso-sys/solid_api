#! /bin/sh
sudo service mysql stop
docker-compose up -d app_dev
docker-compose up -d mysql
docker logs -f solidapi_dev
echo "Done"
