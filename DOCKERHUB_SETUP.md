# Настройка DockerHub для GitHub Actions

Для работы GitHub Actions workflow по сборке и пушу Docker образа в DockerHub, необходимо настроить секреты в репозитории.

## Необходимые секреты

1. `DOCKERHUB_USERNAME` - Имя пользователя DockerHub
2. `DOCKERHUB_TOKEN` - Токен доступа к DockerHub

## Создание токена DockerHub

1. Перейдите на сайт [DockerHub](https://hub.docker.com)
2. Войдите в свой аккаунт
3. Перейдите в настройки (Account Settings)
4. Выберите "Security" в левом меню
5. Нажмите "New Access Token"
6. Введите описание токена (например, "GitHub Actions")
7. Выберите уровень доступа (Read & Write recommended)
8. Скопируйте сгенерированный токен

## Настройка секретов в GitHub

1. Перейдите в настройки репозитория (Settings)
2. В левом меню выберите "Secrets and variables" → "Actions"
3. Нажмите "New repository secret"
4. Добавьте оба секрета:
   - Name: `DOCKERHUB_USERNAME`, Value: [ваше имя пользователя DockerHub]
   - Name: `DOCKERHUB_TOKEN`, Value: [ваш токен DockerHub]

## Как это работает

Workflow автоматически запускается при:
- Push в ветки `main` или `develop`
- Создании тега, начинающегося с `v`
- Создании Pull Request в ветку `main`

Образ будет собран и загружен в DockerHub с соответствующими тегами:
- Для веток: `branch-name`
- Для тегов: `version` (например, `1.0.0`)
- Для PR: `pr-номер`
- Для всех сборок: `sha-хэш коммита`

## Имя образа

По умолчанию образ будет называться `ivanov-gym`. Если вы хотите изменить имя образа, отредактируйте переменную `IMAGE_NAME` в файле `.github/workflows/docker-build-push.yml`.