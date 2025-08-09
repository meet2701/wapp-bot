async function factCommand(msg) {
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    if (!response.ok) throw new Error('Failed to fetch fact');

    const data = await response.json();
    const fact = data.text;

    await msg.reply(`💡 Random Fact:\n${fact}`);
  } catch (error) {
    console.error('Error fetching fact:', error);
    await msg.reply("Sorry, I couldn't fetch a fact right now. Please try again later.");
  }
}

module.exports = factCommand;
