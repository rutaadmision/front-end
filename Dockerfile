FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/front-end/browser/ /usr/share/nginx/html/
COPY --from=build /app/dist/front-end/3rdpartylicenses.txt /usr/share/nginx/html/
COPY --from=build /app/dist/front-end/prerendered-routes.json /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]