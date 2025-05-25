---
layout: post
title: Running Multiple Wordpress Instances In Docker
---

When running multiple instances of WordPress in docker, this will be
        very helpful.
```
docker run -e MYSQL_ROOT_PASSWORD='strongpassword' \
-e MYSQL_USER=wpuser -e MYSQL_PASSWORD='strongpassword' -e MYSQL_DATABASE=website_db \
-v /var/www/website/database:/var/lib/mysql --name website_db \
-d --restart always mariadb
```
You must make sure to run mysql or mariadb container first. Because it
        will in on the network created by docker before you create wordpress
        instance

```
docker run -e WORDPRESS_DB_HOST=website_db -e WORDPRESS_DB_USER=wpuser \
-e WORDPRESS_DB_PASSWORD='strongpassword' -e WORDPRESS_DB_NAME=website_db \
-p 8081:80 -v /var/www/website/html:/var/www/html --name website_wordpress \
--link [db container name]:mysql -d --restart always wordpress
```

you can certainly access volumes from `/var/`. And also use docker exec to
        add dbdump files.
