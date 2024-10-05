const mineflayer = require('mineflayer');

// Function to start the bot
function startBot() {
  const bot = mineflayer.createBot({
    host: 'vanshENBF.aternos.me', // Replace with your Minecraft server IP
    port: 29303,                  // The port number (default is 25565)
    username: 'BOTv2',           // The username for the bot
    version: false                // Or specify the version number
  });

  // Event: Bot has spawned and is connected to the server
  bot.on('spawn', () => {
    console.log('Bot has spawned and is connected to the server');
  });

  // Event: Error occurred
  bot.on('error', (err) => {
    console.log('Error:', err);
  });

  // Event: Bot has disconnected, attempting to reconnect
  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    setTimeout(() => {
      startBot(); // Restart the bot
    }, 5000);
  });
}

// Export the startBot function
module.exports = { startBot };
