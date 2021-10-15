FROM nginx:1.15

COPY ./build /usr/share/nginx/html
COPY nginx_conf/default.conf /etc/nginx/conf.d/default.conf

RUN touch /var/run/nginx.pid && \
    chmod -R 777 /var/run/nginx.pid && \
    chmod -R 777 /var/cache/nginx

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

USER www-date