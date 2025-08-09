const express = require("express");
const { client } = require("../whatsapp/client");

const router = express.Router();

router.post("/", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).send("Missing number or message");
  }

  let chatId;
  if (number.endsWith("@g.us")) {
    chatId = number;
  } else if (number.endsWith("@c.us")) {
    chatId = number;
  } else {
    chatId = `${number}@c.us`;
  }

  try {
    await client.sendMessage(chatId, message);
    res.send(`Message sent to ${number}`);
  } catch (err) {
    res.status(500).send("Failed to send message: " + err.message);
  }
});

module.exports = router;
