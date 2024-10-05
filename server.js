// Import the required modules
const express = require('express');
const { startBot } = require('./bot'); // Import your bot function from bot.js

// Create an instance of an Express application
const app = express();

// Define the port to listen on, using the PORT environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, world! Your server is running and the bot is connected!');
});

// Start the bot
startBot(); // Call the function that starts the bot

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
