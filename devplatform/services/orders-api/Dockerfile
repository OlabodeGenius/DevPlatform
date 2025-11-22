# syntax=docker/dockerfile:1

FROM node:20-alpine

# We'll mirror the repo structure under /app:
# /app/services/orders-api
# /app/packages/common

WORKDIR /app

# 1) Copy the service's package files
COPY services/orders-api/package*.json ./services/orders-api/

# 2) Copy the shared common package so that "file:../../packages/common"
#    in package.json can be resolved.
COPY packages/common ./packages/common

# 3) Install dependencies for the service
WORKDIR /app/services/orders-api
RUN npm ci || npm i --omit=dev

# 4) Copy the service source code
COPY services/orders-api/app ./app

# 5) Start the service
CMD ["npm", "start"]

