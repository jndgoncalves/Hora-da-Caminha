import SleepTightClient from '../SleepTightClient';
import { Application, Request, Response } from 'express';
import { sendChannelMessage } from './messages/sendChannelMessage';
import {
  fetchGuildMember,
  isUserInVoiceChannel,
  removeUserFromVoiceChannel,
} from './voiceChannelUtils';
import { playAudio } from './audioUtils';
import { joinVoiceChannel } from '@discordjs/voice';

export async function handlerNotification(
  app: Application,
  SleepTightClient: SleepTightClient
) {
  /**
   * Sets up an Express endpoint to handle notifications and send messages to a Discord channel.
   *
   * @param {string} endpoint - The URL endpoint to listen for (e.g., '/sleep-notification').
   * @param {string} message - The prefix for the message to be sent to Discord (e.g., 'User has fallen asleep').
   */

  // Get the current time in HH:mm:ss format.
  const currentTime = new Date().toLocaleTimeString();

  // Text channel where the bot will send messages.
  const channel = SleepTightClient.channels.cache.get(
    process.env.TEXT_CHANNEL_ID!
  );

  const guild = SleepTightClient.guilds.cache.get(process.env.GUILD_ID!);

  // User ID of the user to kicked from the voice channel.
  const sleepingUser = fetchGuildMember(guild!, process.env.USER_ID!);

  function registerEndpoint(endpoint: string, message: string) {
    app.get(endpoint, async (req: Request, res: Response) => {
      // Respond to the HTTP request indicating that the notification was sent to Discord.
      res.send(`${message}. Notification sent to Discord!`);
      console.log(`!${message}. Notification sent to Discord! ${currentTime}`);

      // Send a goodbye message to the text channel.
      sendChannelMessage(channel!, message);

      if (isUserInVoiceChannel(await sleepingUser!)) {
        const voiceChannel = (await sleepingUser).voice.channel;
        const connection = joinVoiceChannel({
          channelId: voiceChannel!.id,
          guildId: guild!.id,
          adapterCreator: guild!.voiceAdapterCreator,
        });
        playAudio(connection!, './public/sounds/hush-little-baby.mp3');
        removeUserFromVoiceChannel(await sleepingUser!);
      }
    });
  }
  registerEndpoint(
    '/sleep-notification',
    `${(await sleepingUser).nickname}User has fallen asleep`
  );
}
