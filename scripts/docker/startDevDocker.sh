#! /bin/sh

docker-compose up -d app_dev
docker-compose up -d mysql

echo "Done"
