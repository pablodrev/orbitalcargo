# backend/Dockerfile

# 1. Базовый образ
FROM python:3.11-slim

# 2. Установим рабочую директорию
WORKDIR /app

# 3. Установим зависимости
# копируем requirements.txt и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# 4. Копируем всё приложение внутрь контейнера
COPY ./app /app

# Добавим скрипт entrypoint для применения миграций перед стартом
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 5. Переменные окружения
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 6. Запуск: запускаем entrypoint, который применит alembic миграции и затем стартует uvicorn
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
