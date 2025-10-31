# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /app

# Copy manifest first for better Docker layer caching
COPY package.json .
# Use npm ci if a lockfile exists; otherwise fall back to npm i
RUN npm ci || npm i --omit=dev

# Copy source
COPY app ./app

EXPOSE 3000
CMD ["npm","start"]
