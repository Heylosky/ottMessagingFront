# Vue 3 + Vite

This project is based on VUE3 + Vite.

npm create vite@latest ott-msg-web -- --template vue
cd ott-msg-web
npm install
npm run dev
npm build

## Project Purpose

- A website for OTT messaging platform.
- Be able to edit messages.
- Be able to send message to single number.
- Be able to send message to multi numbers.
- Cloud show message deliver status in table.
- Authorizations.
- TLS service.
- HA architecture.

## Milestone

- Project start date: 2023-Mar-9

## 提示
1. 所有前端页面访问后端时，需要通过nginx配置转发，以解决跨域问题，并且在nginx中配置ssl，例如：
```
server {
    listen       8082 ssl;
    listen  [::]:8082 ssl;
    server_name  ott;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    ssl_certificate /etc/nginx/ssl.crt;
    ssl_certificate_key /etc/nginx/ssl.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    
    add_header Access-Control-Allow-Origin $http_origin always;
    add_header Access-Control-Allow-Headers X-Requested-With always;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS always;

    location / {
        if ($request_method = 'OPTIONS') {
           add_header Access-Control-Allow-Origin $http_origin;
           add_header Access-Control-Allow-Headers 'authorization, Content-Type';
           return 204;
        }
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://www.sdesk.tech:8081/; # 转发地址
    }
}
```
启动命令:
``docker run -p 80:80 -p 8080:8080 -p 8082:8082 -d --name nginx -v /root/nginx/conf/conf.d:/etc/nginx/conf.d -v /root/9447796_www.sdesk.tech.key:/etc/nginx/ssl.key -v /root/9447796_www.sdesk.tech.pem:/etc/nginx/ssl.crt nginx``



