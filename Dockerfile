# Используем более конкретную версию Node.js для воспроизводимости
FROM node:20.19.6-bookworm-slim AS builder

# Создаем непривилегированного пользователя для безопасности
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Создаем директорию и устанавливаем владельца
RUN mkdir /myfiles && chown -R appuser:appgroup /myfiles
WORKDIR /myfiles

# Устанавливаем зависимости apt в одном слое и очищаем кэш
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*

# Копируем только package файлы для лучшего кэширования
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Копируем остальные файлы
COPY . .

# Меняем владельца файлов
RUN chown -R appuser:appgroup /myfiles

# Переключаемся на непривилегированного пользователя
USER appuser

# Сборка приложения
RUN npm run build

# Используем более свежий и безопасный образ nginx
FROM nginx:1.25-alpine

# Копируем кастомный nginx конфиг
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем статические файлы из builder stage
COPY --from=builder /myfiles/dist/ivanov-gym /usr/share/nginx/html

# Устанавливаем правильные права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Добавляем healthcheck для мониторинга состояния контейнера
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Открываем порт
EXPOSE 80

# Запускаем nginx без прав root
USER nginx
CMD ["nginx", "-g", "daemon off;"]
