const { allowedGroupIds, warningLimits, blacklist } = require("../../config/groups");
const userWarnings = new Map();

// Import commands
const helpCommand = require("../../commands/help");
const everyoneCommand = require("../../commands/everyone");
const adminCommand = require("../../commands/admin");
const kickCommand = require("../../commands/kick");
const factCommand = require("../../commands/fact");
const muteCommand = require("../../commands/mute");
const unmuteCommand = require("../../commands/unmute");
const mutedUsers = require("../../utils/mutedUsers");

async function handleMessage(client, msg) {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  const senderName = contact.pushname || contact.name || msg.from;
  const messageText = msg.body.toLowerCase();

  console.log(`[${chat.id._serialized}] ${senderName}: ${msg.body}`);

  const isFromAllowedGroup = chat.isGroup && allowedGroupIds.has(chat.id._serialized);
  if (!isFromAllowedGroup) return;

  // === Ignore + delete muted users' messages ===
  const mutedSet = mutedUsers.get(chat.id._serialized) || new Set();
  if (mutedSet.has(contact.id._serialized)) {
    try {
      // Delete their message for everyone
      await msg.delete(true).catch(err => {
        console.error(`Failed to delete message:`, err);
      });

      console.log(`🗑 Deleted message from muted user ${senderName} in ${chat.name}`);
    } catch (err) {
      console.error(`Failed to delete muted message from ${senderName}:`, err);
    }
    return;
  }

  console.log(`[${chat.name}] ${senderName}: ${msg.body}`);

  // === Commands ===
  if (messageText.includes("@help")) {
    return helpCommand(msg);
  }

  if (messageText.includes("@everyone")) {
    return everyoneCommand(msg, chat, senderName);
  }

  if (messageText.includes("@admin")) {
    return adminCommand(msg, chat, senderName);
  }

  if (messageText.includes("@kick")) {
    return kickCommand(msg, chat, senderName);
  }

  if (messageText.includes("@fact")) {
    return factCommand(msg);
  }

  if (messageText.startsWith("@mute")) {
    return muteCommand(msg, chat, senderName, client);
  }

  if (messageText.startsWith("@unmute")) {
    return unmuteCommand(msg, chat, senderName, client);
  }

  // === Abusive language warnings ===
  if (blacklist.some((word) => new RegExp(`\\b${word}\\b`).test(messageText))) {
    const userKey = `${msg.author || msg.from}_${chat.id._serialized}`;
    const currentWarnings = userWarnings.get(userKey) || 0;
    const newWarnings = currentWarnings + 1;
    userWarnings.set(userKey, newWarnings);

    const maxWarnings = warningLimits.get(chat.id._serialized) || 5;

    if (newWarnings >= maxWarnings) {
      const kickMessage = `🚫 *${senderName}* has been removed for repeated use of abusive language (${maxWarnings} warnings).`;
      await chat.sendMessage(kickMessage, { mentions: [contact], quotedMessageId: msg.id._serialized });
      await chat.removeParticipants([contact.id._serialized]);
      userWarnings.delete(userKey);
      return;
    }

    const warningMessage = `⚠️ *${senderName}*, Please avoid using abusive language.`;
    await chat.sendMessage(warningMessage, { mentions: [contact], quotedMessageId: msg.id._serialized });
  }
}

module.exports = { handleMessage };
