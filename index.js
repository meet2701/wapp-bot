const express = require("express");
const client = require("./whatsapp/client");
const sendMessageRoute = require("./routes/sendMessage");

const app = express();
app.use(express.json());

app.use("/send", sendMessageRoute);

app.get("/", (req, res) => {
  res.send("WhatsApp Express Server is running.");
});

// Only start server after WhatsApp client is ready
client.on("ready", () => {
  app.listen(3000, () => {
    console.log(`🚀 Server running at http://localhost:3000`);
  });
});
