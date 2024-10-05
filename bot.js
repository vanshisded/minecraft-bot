const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vanshENBF.aternos.me', // Replace with your Minecraft server IP
    port: 29303,                  // The port number (default is 25565)
    username: 'BOTv2',           // The username for the bot
    version: '1.18.1',           // Specify the correct Minecraft version
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned and is connected to the server');
  });

  bot.on('error', (err) => {
    console.error('Error occurred:', err);
    // Ignore all errors
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    setTimeout(() => {
      startBot(); // Reconnect the bot
    }, 5000); // Wait 5 seconds before reconnecting
  });

  // Example event handler (you can add more)
  bot.on('chat', (username, message) => {
    try {
      // Respond to chat messages or any other action
      if (username === bot.username) return; // Ignore own messages
      bot.chat(`You said: ${message}`); // Echo the message
    } catch (error) {
      console.error('Error handling chat:', error);
      // Ignore any errors in chat handling
    }
  });
}

// Set up global error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Ignore uncaught exceptions
});

// Optionally catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Ignore unhandled promise rejections
});

// Start the bot
startBot();
