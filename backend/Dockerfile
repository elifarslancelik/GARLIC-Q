# Aşama 1: Bağımlılıkları Derleme
FROM python:3.11.9-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    libpng-dev \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.lock ./
RUN pip install --upgrade pip && \
    pip install -r requirements.lock

# Aşama 2: Nihai Çalışma İmajı
FROM python:3.11.9-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app \
    HOME=/app \
    XDG_CACHE_HOME=/app/cache \
    TORCH_HOME=/app/cache

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    libjpeg62-turbo \
    zlib1g \
    libpng16-16 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/cache && chmod -R 777 /app/cache

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY app ./app
COPY models ./models

RUN groupadd -r appgroup && \
    useradd -r -g appgroup -d /app -s /usr/sbin/nologin appuser && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 7860

HEALTHCHECK --interval=30s --timeout=3s CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:' + '${PORT:-7860}' + '/health').getcode() == 200 or exit(1)"

CMD ["sh", "-c", "[ -n \"$DATABASE_URL\" ] || { echo 'ERROR: DATABASE_URL required' >&2; exit 1; }; uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-7860}"]