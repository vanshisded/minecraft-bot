const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'vanshENBF.aternos.me', // Replace with your Minecraft server IP
  port: 29303,            // The port number (default is 25565)
  username: 'BOTv2', // The username for the bot
  version: false          // Or specify the version number
});

bot.on('spawn', () => {
  console.log('Bot has spawned and is connected to the server');
});

bot.on('error', (err) => {
  console.log('Error:', err);
});

bot.on('end', () => {
  console.log('Bot has disconnected. Reconnecting...');
  // Automatically reconnect
  setTimeout(() => {
    bot.connect();
  }, 5000);
});
