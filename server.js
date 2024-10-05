// Import the required modules
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port to listen on, using the PORT environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, world! Your server is running!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
