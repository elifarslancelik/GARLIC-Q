FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements if exists
COPY models/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt || echo "No requirements.txt found"

# Copy models code
COPY models/ ./models/
COPY shared/ ./shared/

# Create cache directory for models
RUN mkdir -p /root/.cache/torch

# Expose port for model service (if needed)
EXPOSE 8001

# Command to run the model service
CMD ["python", "-m", "models.ollama_client"] 