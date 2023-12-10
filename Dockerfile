# production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY . ./
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]