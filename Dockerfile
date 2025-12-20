FROM node:20.19.6-bookworm-slim AS builder
RUN mkdir /myfiles
WORKDIR /myfiles
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
# RUN git -c http.sslVerify=false clone https://github.com/HakasLepehen/IvanovGym .
RUN git clone https://github.com/HakasLepehen/IvanovGym .
RUN npm ci
RUN npm run build

chown -R 101: /usr/share/nginx/html
FROM nginx:alpine

COPY --from=builder /myfiles/dist/ivanov-gym /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
