# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY frontend/ ./frontend/
COPY shared/ ./shared/

# Build the application
RUN npm run build --workspace=frontend

# Production stage
FROM nginx:alpine

# Install envsubst for environment variable substitution
RUN apk add --no-cache bash

# Copy built files from builder stage
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx configuration template
COPY frontend/nginx.conf /etc/nginx/nginx.conf.template

# Copy entrypoint script
COPY frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 80

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"] 