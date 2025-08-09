module.exports = async function helpCommand(msg) {
  const helpText = `
📜 *Available Commands* 📜

🔹 @everyone — Tag all group members (Admin only)
🔹 @admin — Tag all group admins
🔹 @kick @user — Remove mentioned member(s) from the group (Admin only)
🔹 @fact — Get a random interesting fact
🔹 @help — Show this help message

💡 Type any of the above commands in the group to use them.
  `;
  
  await msg.reply(helpText);
};
