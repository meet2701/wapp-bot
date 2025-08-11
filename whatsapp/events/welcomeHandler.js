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
`*🎉 Welcome to ${chat.name}*,*${newMemberName}*, 🚀 Glad to have you here 🤝 Let’s make this group awesome! 💬✨`;

    await chat.sendMessage(welcomeMessage, { mentions: [contact] });
  } catch (err) {
    console.error("❌ Failed to send welcome message:", err);
  }
}

module.exports = { handleWelcome };
