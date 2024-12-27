FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
CMD /bin/sh -c "envsubst '\$KAFKA_SENDER_HOST \$KAFKA_RECEIVER_HOST' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"