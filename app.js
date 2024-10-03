// File: app.js
const Ably = require("ably");
const { Pool } = require("pg");
const config = require("./config");

// Connect to Ably
const ablyClient = new Ably.Realtime(config.ably.apiKey);

// Connect to PostgreSQL
const pgPool = new Pool(config.postgres);

// Function to log Ably events to PostgreSQL
function logEvent(channel, message) {
  const query = `
    INSERT INTO ably_logs (channel, event_name, event_data, client_id)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [
    channel,
    message.name,
    JSON.stringify(message.data),
    message.clientId,
  ];

  pgPool
    .query(query, values)
    .then(() => console.log(`Event logged: ${message.name}`))
    .catch((err) => console.error("Error logging event:", err));
}

// Subscribe to an Ably channel
function subscribeToChannel(channelName) {
  const channel = ablyClient.channels.get(channelName);
  channel.subscribe((message) => {
    console.log(`Received message: ${message.name}`);
    logEvent(channelName, message);
  });
  console.log(`Subscribed to channel: ${channelName}`);
}

// Example usage
subscribeToChannel("test-channel");

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down...");
  ablyClient.close();
  pgPool.end();
  process.exit();
});
