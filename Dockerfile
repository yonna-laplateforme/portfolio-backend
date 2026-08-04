FROM node:lts-alpine AS builder

WORKDIR /app

RUN apk add --no-cache ca-certificates \
    && update-ca-certificates

COPY package*.json ./
RUN npm install

COPY . .

# Étape 2 : Production
FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache ca-certificates \
    && update-ca-certificates

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]