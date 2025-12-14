FROM node:20.19.6-bookworm-slim AS builder
WORKDIR /myfiles
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/HakasLepehen/IvanovGym .
RUN npm ci
RUN npm run build


FROM nginx:alpine

COPY --from=builder /myfiles/dist/ivanov-gym /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
