const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { handleMessage } = require("./events/messageHandler");
const { handleWelcome } = require("./events/welcomeHandler");

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "main" }), // <-- persists session across restarts
  puppeteer: { headless: true, args: ["--no-sandbox"] },
});

// QR code for first-time login
client.on("qr", qr => {
  console.log("Scan this QR code to log in:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => console.log("✅ WhatsApp is ready!"));
client.on("authenticated", () => console.log("🔐 Authenticated!"));

client.on("message", msg => handleMessage(client, msg));
client.on("group_join", notification => handleWelcome(client, notification));

client.initialize();

module.exports = client;
