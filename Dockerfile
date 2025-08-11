FROM node:20-bullseye

# Install Chromium and dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      chromium \
      libglib2.0-0 \
      libnss3 \
      libx11-6 \
      libxss1 \
      libasound2 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libgbm1 \
      libxcomposite1 \
      libxdamage1 \
      libxext6 \
      libxrandr2 \
      libxfixes3 \
      ca-certificates \
      fonts-liberation && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Puppeteer will use system Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3000
CMD ["node", "index.js"]
