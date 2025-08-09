module.exports = async function everyoneCommand(msg, chat, senderName) {
  const senderId = msg.author || msg.from;
  const senderIsAdmin = chat.participants.some(
    (p) => p.id._serialized === senderId && p.isAdmin
  );

  if (senderIsAdmin) {
    const mentionIds = chat.participants.map((p) => p.id._serialized);
    await chat.sendMessage(`📢 *${senderName}* tagged everyone:`, {
      mentions: mentionIds,
      quotedMessageId: msg.id._serialized,
    });
  } else {
    await msg.reply(`⛔ *${senderName}*, only *group admins* can use @everyone.`);
  }
};
