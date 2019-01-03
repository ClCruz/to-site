# SITE (HOME) 
### Builded in VUEJS.  

## How to develop

### Setup
```
npm install
```
### Gulp
```
gulp watch
```
### localhost
```
npm run serve
```


## How to install  

### Setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```

### Docker
```bash
sudo docker run -it -d -p 2001:80 --restart=always --name unique.site \
-v /var/www/unique/site:/var/www/html \
blcoccaro/linuxphpsql:v5
```

### meanings 
| location | what |
| -------- | ----- |
| /var/www/unique/site | where is the build of site (dist) |

### .htaccess
```.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|WhatsApp|Google.*snippet)
  RewriteRule ^evento/(.*)$ http://192.168.81.22:2002/v1/event_metatag?id=$1 [P]
  RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|WhatsApp|Google.*snippet)
  RewriteRule ^busca/(.*)$ http://192.168.81.22:2002/v1/search_metatag?id=$1 [P]
  RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|WhatsApp|Google.*snippet)
  RewriteRule ^$ http://192.168.81.22:2002/v1/home_metatag [P]

  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

![MC HAMMER](https://camo.githubusercontent.com/294d473d32d1d33750ea6a059bcd44cf31398535/687474703a2f2f692e696d6775722e636f6d2f6163484d3330786c2e6a7067)