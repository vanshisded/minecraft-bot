const mineflayer = require('mineflayer');
const axios = require('axios');

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1292030545424945172/I8_xhviFgSzfmTfAoudBMUysBqJKn9er0XoIPBFBmfSSa8lvCVcpnFvfYl7SMKOPpBm5'; // Replace with your Discord webhook URL
let messageId; // Store the message ID for editing the embed
let embed; // Store the embed object

const messages = [
  "Hello, everyone!",
  "I'm a bot! How's it going?",
  "Isn't Minecraft great?",
  "Watch out for creepers!",
  "Don't forget to build a shelter!",
  "I'm here to help!",
  "Enjoy your time in the game!",
  "Stay hydrated while gaming!",
  "Let’s find some diamonds!",
  "Exploring new lands is fun!"
];

function createEmbed(status) {
  return {
    title: 'Bot Status Update',
    description: `Current Status: **${status}**`,
    fields: [
      { name: 'Server', value: 'vanshENBF.aternos.me', inline: true },
      { name: 'Port', value: '29303', inline: true },
      { name: 'Username', value: 'BOTv2', inline: true },
      { name: 'Last Updated', value: new Date().toLocaleString(), inline: true },
    ],
    color: status === 'Connected' ? 3066993 : 15158332, // Green for connected, red for disconnected
    timestamp: new Date(),
  };
}

function sendInitialStatusUpdate(status) {
  embed = createEmbed(status);

  axios.post(DISCORD_WEBHOOK_URL, {
    embeds: [embed],
  })
  .then(response => {
    messageId = response.data.id; // Store the message ID for future edits
  })
  .catch(err => {
    console.error('Error sending initial status update to Discord:', err);
  });
}

function editStatusUpdate(status) {
  if (!messageId) return; // Exit if messageId is not available

  embed = createEmbed(status);
  
  axios.patch(`${DISCORD_WEBHOOK_URL}/messages/${messageId}`, {
    embeds: [embed],
  })
  .then(response => {
    console.log('Status embed edited successfully');
  })
  .catch(err => {
    console.error('Error editing status update in Discord:', err);
  });
}

function sendRandomMessage(bot) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];
  bot.chat(randomMessage);
}

function startBot() {
  const bot = mineflayer.createBot({
    host: 'vanshENBF.aternos.me', // Replace with your Minecraft server IP
    port: 29303,                  // The port number (default is 25565)
    username: 'BOTv2',           // The username for the bot
    version: '1.18.1',           // Specify the correct Minecraft version
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned and is connected to the server');
    sendInitialStatusUpdate('Connected');

    // Send random messages every 5 minutes
    setInterval(() => {
      sendRandomMessage(bot);
    }, 300000); // 5 minutes in milliseconds
  });

  bot.on('error', (err) => {
    console.error('Error occurred:', err);
    editStatusUpdate('Disconnected');
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    editStatusUpdate('Disconnected');
    setTimeout(() => {
      startBot(); // Reconnect the bot
    }, 59000); // Wait 59 seconds before reconnecting
  });

  // Periodic status update every minute
  setInterval(() => {
    if (bot.player) {
      editStatusUpdate('Connected');
    } else {
      editStatusUpdate('Disconnected');
    }
  }, 60000); // Check status every 60 seconds
}

// Set up global error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Optionally catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the bot
startBot();
