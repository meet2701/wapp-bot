module.exports = async function adminCommand(msg, chat, senderName) {
  const admins = chat.participants.filter((p) => p.isAdmin);
  const mentionIds = admins.map((a) => a.id._serialized);

  await chat.sendMessage(`🛡️ *${senderName}* tagged all admins:`, {
    mentions: mentionIds,
    quotedMessageId: msg.id._serialized,
  });
};
