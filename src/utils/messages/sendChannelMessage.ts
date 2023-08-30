import { Channel, TextChannel } from 'discord.js';

export function sendChannelMessage(channel: Channel, message: string) {
  // Fetch the specified Discord text channel using its ID.

  if (!(channel instanceof TextChannel)) {
    console.error(`Channel  is not a text channel or not found.`);
  } else {
    if (channel.isTextBased()) channel.send(`${message}!`);
  }
}
