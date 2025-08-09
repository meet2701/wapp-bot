module.exports = async function kickCommand(msg, chat, senderName) {
  const senderId = msg.author || msg.from;

  if (!chat.isGroup) {
    await msg.reply("❗ This command can only be used in groups.");
    return;
  }

  const senderIsAdmin = chat.participants.some(
    (p) => p.id._serialized === senderId && p.isAdmin
  );

  if (!senderIsAdmin) {
    await msg.reply(`⛔ *${senderName}*, only *group admins* can use @kick.`);
    return;
  }

  const mentions = await msg.getMentions();

  if (mentions.length === 0) {
    await msg.reply("❗ Please mention the user(s) you want to kick. Example: `@kick @user`");
    return;
  }

  try {
    for (const contact of mentions) {
      const isTargetAdmin = chat.participants.some(
        (p) => p.id._serialized === contact.id._serialized && p.isAdmin
      );

      if (isTargetAdmin) {
        await msg.reply(`⚠️ Cannot remove admin: *${contact.pushname || contact.number}*`);
        continue;
      }

      await chat.removeParticipants([contact.id._serialized]);
      await msg.reply(`👢 Removed *${contact.pushname || contact.number}* from the group.`);
      console.log(`👢 ${contact.pushname || contact.number} kicked from ${chat.name}`);
    }
  } catch (err) {
    console.error("❌ Failed to kick user(s):", err);
    await msg.reply("❌ Failed to remove one or more users.");
  }
};
