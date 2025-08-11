#!/bin/bash
set -e
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
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
  fonts-liberation
