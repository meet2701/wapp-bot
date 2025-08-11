# 📱 WhatsApp Bot

A lightweight WhatsApp moderation bot for monitoring groups, warning users, and blocking defined words.  
Simple to configure and quick to run.

---

## 🔎 Overview

This repository contains a Node.js WhatsApp bot that:
- Monitors messages in configured groups.
- Warns or takes action based on configured limits.
- Blocks messages containing blacklisted words.

> ⚠️ **Disclaimer:** The bot **cannot see messages** sent from the WhatsApp account that is logged in (i.e., messages typed from the device/account that scanned the QR may not be processed depending on the library). Use responsibly.

---

## 🧰 Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)
- Git (if you plan to push to GitHub)
- A phone with WhatsApp to scan the QR code

---

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/your-username/whatsapp-bot.git
cd whatsapp-bot
```

2. Install dependencies:
```bash
npm install
```

3. Run the bot:
```bash
node index.js
```
4. Link your WhatsApp:

- A QR code will appear (in terminal or browser, depending on your WhatsApp lib).
- On your phone: WhatsApp → Linked devices → Link a device → Scan the QR code.
- Once scanned, the bot will be linked and start monitoring configured groups.