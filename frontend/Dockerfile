FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install dependencies with development packages
COPY package*.json ./
RUN npm install

# Set NODE_ENV to development
ENV NODE_ENV=development
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Don't copy node_modules from host
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server with hot reloading and bind to all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]