# frontend/Dockerfile (development)

FROM node:18

# 1. Рабочая директория
WORKDIR /usr/src/app

# 2. Установим зависимости
COPY package*.json ./
RUN npm install

# 3. Копируем исходники
COPY . .

# 4. Откроем порт React Dev Server
EXPOSE 3000

# 5. Запуск dev-сервера (с горячей перезагрузкой)
CMD ["npm", "start"]
