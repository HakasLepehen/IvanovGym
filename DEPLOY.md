# Инструкция по развертыванию на VPS (без SSL)

## Шаг 1: Подготовка VPS

Подключитесь к вашему VPS по SSH и выполните:

# Обновление системы

sudo apt update && sudo apt upgrade -y

# Установка Docker

sudo apt install -y docker.io docker-compose-plugin

# Запуск Docker

sudo systemctl start docker
sudo systemctl enable docker

# Проверка установки

docker --version
docker compose version

## Шаг 2: Клонирование репозитория

```bash
# Клонирование проекта
git clone https://github.com/HakasLepehen/IvanovGym.git
cd IvanovGym
```

## Шаг 3: Запуск приложения

```bash
# Сборка и запуск контейнера
docker compose up -d --build

# Проверка статуса контейнера
docker ps

# Просмотр логов (если нужно)
docker compose logs -f
```

## Шаг 4: Настройка Firewall

```bash
# Разрешить порт 80 (HTTP)
sudo ufw allow 80/tcp

# Включить firewall (если еще не включен)
sudo ufw enable

# Проверить статус
sudo ufw status
```

## Шаг 5: Проверка работы

### Узнайте IP адрес вашего VPS:

```bash
# Вариант 1: через команду
curl ifconfig.me

# Вариант 2: через hostname
hostname -I

# Вариант 3: через ip
ip addr show
```

### Откройте в браузере:

```
http://YOUR_VPS_IP
```

Замените `YOUR_VPS_IP` на IP адрес вашего сервера.

## Полезные команды

### Управление контейнером

```bash
# Остановить контейнер
docker compose stop

# Запустить контейнер
docker compose start

# Перезапустить контейнер
docker compose restart

# Остановить и удалить контейнер
docker compose down

# Просмотр логов
docker compose logs -f frontend

# Просмотр логов за последние 100 строк
docker compose logs --tail=100 frontend
```

### Обновление приложения

```bash
# Перейти в директорию проекта
cd ~/IvanovGym

# Получить последние изменения
git pull

# Пересобрать и перезапустить
docker compose up -d --build
```

### Проверка состояния

```bash
# Статус контейнеров
docker compose ps

# Использование ресурсов
docker stats ivanov-gym-app

# Проверка здоровья контейнера
docker inspect ivanov-gym-app | grep Health
```

### Устранение проблем

```bash
# Если контейнер не запускается
docker compose logs frontend

# Проверка портов
sudo netstat -tlnp | grep 80

# Пересоздание контейнера с нуля
docker compose down -v
docker compose up -d --build
```

## Важные замечания

⚠️ **Безопасность:**

- Приложение работает по HTTP (без шифрования)
- Данные передаются в открытом виде
- Не рекомендуется для production с чувствительными данными
- Для production используйте домен с SSL сертификатом

## Следующие шаги (опционально)

Когда будете готовы к production:

1. **Купите домен** (например, на Namecheap, GoDaddy, Reg.ru)
2. **Настройте DNS** записи (A-запись на IP вашего VPS)
3. **Установите Nginx** на хосте как reverse proxy
4. **Получите SSL сертификат** через Let's Encrypt (certbot)
5. **Настройте HTTPS** для безопасного доступа

Подробные инструкции по настройке SSL см. в файле `DEPLOY-SSL.md` (если создадите его позже).

```

Инструкция упрощена: только шаги без SSL. Docker-compose.yml уже настроен правильно (проброс порта 80).

**Что включено:**
- Установка Docker
- Клонирование репозитория
- Запуск приложения
- Настройка firewall
- Полезные команды
- Устранение проблем

**Что исключено:**
- Установка Nginx
- Настройка SSL
- Конфигурация reverse proxy

Приложение будет доступно по `http://YOUR_VPS_IP` после выполнения этих шагов.
```
