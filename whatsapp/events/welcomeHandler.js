const { allowedGroupIds } = require("../../config/groups");

async function handleWelcome(client, notification) {
  try {
    const chat = await notification.getChat();

    if (!allowedGroupIds.has(chat.id._serialized)) return;

    const botId = client.info.wid._serialized;
    const botParticipant = chat.participants.find(p => p.id._serialized === botId);
    if (!botParticipant || !botParticipant.isAdmin) return;

    const newParticipantId = notification.recipientIds[0];
    const contact = await client.getContactById(newParticipantId);
    const newMemberName = contact.pushname || contact.name || "Member";

    const welcomeMessage =
`✨🌸 *Welcome to ${chat.name}!* 🌸✨
Hey *${newMemberName}*, we’re so happy you joined our anime family! 🏯💮

🗡️ Grab your katana, summon your stand, or just relax in the hot springs — your adventure begins here! 🍡

🎯 Before you start your journey, tell us:
1️⃣ What's your favorite anime? 🎥
2️⃣ Who’s your ultimate waifu/husbando? 💖
3️⃣ Favorite movie? 🍿
4️⃣ Games you love to play? 🎮

Let’s make some legendary memories together! 🚀
`;

    await chat.sendMessage(welcomeMessage, { mentions: [contact] });
  } catch (err) {
    console.error("❌ Failed to send welcome message:", err);
  }
}

module.exports = { handleWelcome };
