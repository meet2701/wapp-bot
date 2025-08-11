// ===== Allowed Group IDs =====
// Add the WhatsApp Group IDs here where your bot should be active.
// Example format: "1234567890-123456789@g.us"
const allowedGroupIds = new Set([
  // "group-id-here"
]);

// ===== Warning Limits =====
// Map of group IDs to their maximum allowed warnings before taking action.
// Example: ["group-id-here", 3] means 3 warnings max in that group.
const warningLimits = new Map([
  // ["group-id-here", maxWarnings]
]);

// ===== Blacklist =====
// Words to block in chats.
// Example: "badword"
const blacklist = [
  // "word1", "word2"
];

module.exports = { allowedGroupIds, warningLimits, blacklist };
