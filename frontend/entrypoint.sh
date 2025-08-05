#!/bin/bash

# Set default backend URL if not provided
export BACKEND_URL=${BACKEND_URL:-http://backend:8000}

# Substitute environment variables in nginx config
envsubst '${BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g "daemon off;" 