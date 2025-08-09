const mutedUsers = require("../utils/mutedUsers");

module.exports = async function muteCommand(msg, chat, senderName, client) {
    const senderId = msg.author || msg.from;
    const senderIsAdmin = chat.participants.some(
        (p) => p.id._serialized === senderId && p.isAdmin
    );

    if (!senderIsAdmin) {
        return msg.reply(`⛔ *${senderName}*, only *group admins* can mute members.`);
    }

    if (!msg.mentionedIds.length) {
        return msg.reply("⚠️ Please tag the user(s) you want to mute.");
    }

    let mutedSet = mutedUsers.get(chat.id._serialized) || new Set();
    msg.mentionedIds.forEach(id => mutedSet.add(id));

    mutedUsers.set(chat.id._serialized, mutedSet);

    const mentionedContacts = await Promise.all(
        msg.mentionedIds.map(id => client.getContactById(id))
    );

    await chat.sendMessage(
        `🔇 Muted: ${msg.mentionedIds.map(id => `@${id.split('@')[0]}`).join(", ")}`,
        { mentions: mentionedContacts }
    );
};
