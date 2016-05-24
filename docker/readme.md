# command :

to run mysql : 

docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=lrds -e MYSQL_PASSWORD=lrds -E MYSQL_DATABASE=lrds -d mysql-env

to run web-container:
 
docker run -it -p 3000:8080 --link sick_payne -e PROD_URL=192.168.99.100 -e PORT=8080 -e PROD_USER=lrds -e PROD_PASS=lrds -e PROD_SCHEMA=lrds web-node-env
docker run -p 3000:8080 --link $NEW_NAME$ -e PROD_URL=192.168.99.100 -e PORT=8080 -e PROD_USER=lrds -e PROD_PASS=lrds -e PROD_SCHEMA=lrds -d web-node-env
