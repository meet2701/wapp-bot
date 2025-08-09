const mutedUsers = require("../utils/mutedUsers");

module.exports = async function unmuteCommand(msg, chat, senderName, client) {
    const senderId = msg.author || msg.from;
    const senderIsAdmin = chat.participants.some(
        (p) => p.id._serialized === senderId && p.isAdmin
    );

    if (!senderIsAdmin) {
        return msg.reply(`⛔ *${senderName}*, only *group admins* can unmute members.`);
    }

    if (!msg.mentionedIds.length) {
        return msg.reply("⚠️ Please tag the user(s) you want to unmute.");
    }

    const mutedSet = mutedUsers.get(chat.id._serialized) || new Set();
    msg.mentionedIds.forEach(id => mutedSet.delete(id));

    mutedUsers.set(chat.id._serialized, mutedSet);

    const mentionedContacts = await Promise.all(
        msg.mentionedIds.map(id => client.getContactById(id))
    );

    await chat.sendMessage(
        `🔊 Unmuted: ${msg.mentionedIds.map(id => `@${id.split('@')[0]}`).join(", ")}`,
        { mentions: mentionedContacts }
    );
};
