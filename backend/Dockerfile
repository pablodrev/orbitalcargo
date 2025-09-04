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

# 5. Переменные окружения
# (например, чтобы Python не кешировал .pyc и вывод логов шел сразу)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 6. Запуск (для dev-режима можно с --reload, для prod — gunicorn/uvicorn worker)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
