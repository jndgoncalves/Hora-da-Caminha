import dotenv from 'dotenv';
import SleepTightClient from './SleepTightClient';
import path from 'node:path';
import fs from 'node:fs';

// Load environment variables from .env file
dotenv.config();

// Create a new instance of SleepTightClient
const client = new SleepTightClient();

// Define the path to the events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.ts'));

(async () => {
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);

    // Dynamically import the event from the current file
    const event = await import(filePath);

    // Check if the event has a property 'once' set to true
    // If true, the event listener will be triggered only once
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      // If the event does not have the 'once' property or it's set to false
      // The event listener will be triggered every time the event occurs
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();

// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);
