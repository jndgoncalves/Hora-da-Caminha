import { Events } from 'discord.js';
// Import the custom SuperDoraemonClient class
import SuperDoraemonClient from '../SuperDoraemonClient';
import express from 'express';

module.exports = {
  name: Events.ClientReady,
  // Set the 'once' property to true, indicating that this event should only be triggered once
  once: true,
  // Function to execute when the ClientReady event is triggered
  execute(client = new SuperDoraemonClient()) {
    const app = express();
    const PORT = 3001;
    const CHANNEL_ID = '1134812036673572889';

    // Log a message to the console indicating the bot's username and tag when it's successfully logged in
    console.log(`Logged in as ${client.user?.tag}!`);

    /**
     * Sets up an Express endpoint to handle notifications and send messages to a Discord channel.
     *
     * @param {string} endpoint - The URL endpoint to listen for (e.g., '/sleep-notification').
     * @param {string} messagePrefix - The prefix for the message to be sent to Discord (e.g., 'User has fallen asleep').
     */

    function handleNotification(endpoint: string, messagePrefix: string) {
      app.get(`${endpoint}`, (req, res) => {
        // Get the current time in HH:mm:ss format.
        const currentTime = new Date().toLocaleTimeString();

        // Fetch the specified Discord text channel using its ID.
        const textChannel = client.channels.cache.get(CHANNEL_ID);
        if (textChannel?.isTextBased()) {
          textChannel.send(`${messagePrefix} at ${currentTime}!`);
        }

        // Respond to the HTTP request indicating that the notification was sent to Discord.
        res.send(`${messagePrefix}. Notification sent to Discord!`);
        console.log(
          `!${messagePrefix}. Notification sent to Discord! ${currentTime}`
        );

        // User ID of the user you want to send a DM to
        const userID = '678385374195613706';

        // Fetch the user using the provided user ID
        client.users
          .fetch(userID)
          .then((user) => {
            // Send a direct message to the fetched user
            return user.send(`${messagePrefix} at ${currentTime}!`);
          })
          .then(() => {
            console.log(`${messagePrefix} at ${currentTime}!`);
          })
          .catch((error) => {
            console.error('Error sending the direct message:', error);
          });
      });
    }

    handleNotification('/open-notes', 'User has open notes app');
    handleNotification('/open-instagram', 'User has open Instagram');
    handleNotification('/sleep-notification', 'User has fallen asleep');

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  },
};
