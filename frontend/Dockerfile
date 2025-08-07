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

# Set environment variables for build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-/api/v1}

# Build the application
RUN npm run build --workspace=frontend

# Production stage
FROM nginx:alpine

# Install envsubst for environment variable substitution
RUN apk add --no-cache bash

# Copy built files from builder stage
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy assets directory separately to ensure it's available
COPY --from=builder /app/frontend/assets /usr/share/nginx/html/assets

# Copy nginx configuration template
COPY frontend/nginx.conf /etc/nginx/nginx.conf.template

# Copy entrypoint script
COPY frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port
EXPOSE 80

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"] 