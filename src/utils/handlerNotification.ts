import SleepTightClient from '../SleepTightClient';
import { Application, Request, Response } from 'express';
import { sendChannelMessage } from './messages/sendChannelMessage';
import {
  connectToVoiceChannel,
  fetchAndRemoveFromVoiceChannel,
  fetchGuildMember,
  isUserInVoiceChannel,
  removeUserFromVoiceChannel,
} from './voiceChannelUtils';
import { playAudio } from './audioUtils';
import { getVoiceConnection, joinVoiceChannel } from '@discordjs/voice';
import { GuildMember } from 'discord.js';

export async function handlerNotification(
  app: Application,
  SleepTightClient: SleepTightClient
) {
  const textChannelID = '1134812036673572889'; // Super Doraemon general channel

  // const userXinada = '678385374195613706'; //Imperador Xinada
  const userZikmix = '123605053335404547'; //Zikmix

  /**
   * Sets up an Express endpoint to handle notifications and send messages to a Discord channel.
   *
   * @param {string} endpoint - The URL endpoint to listen for (e.g., '/sleep-notification').
   * @param {string} message - The prefix for the message to be sent to Discord (e.g., 'User has fallen asleep').
   */

  function registerEndpoint(endpoint: string, message: string) {
    app.get(endpoint, async (req: Request, res: Response) => {
      // Get the current time in HH:mm:ss format.
      const currentTime = new Date().toLocaleTimeString();

      const guild = SleepTightClient.guilds.cache.get(process.env.GUILD_ID!);
      const channel = SleepTightClient.channels.cache.get(textChannelID);

      const memberZikmix = fetchGuildMember(guild!, userZikmix);

      // Respond to the HTTP request indicating that the notification was sent to Discord.
      res.send(`${message}. Notification sent to Discord!`);
      console.log(`!${message}. Notification sent to Discord! ${currentTime}`);

      sendChannelMessage(channel!, message);

      if (isUserInVoiceChannel(await memberZikmix!)) {
        const voiceChannel = (await memberZikmix).voice.channel;
        const connection = joinVoiceChannel({
          channelId: voiceChannel!.id,
          guildId: guild!.id,
          adapterCreator: guild!.voiceAdapterCreator,
        });
        playAudio(connection!, './public/sounds/dormebem.mp3');
        removeUserFromVoiceChannel(await memberZikmix!);
      }
    });
  }
  registerEndpoint('/open-notes', 'User has open notes app');
  registerEndpoint('/sleep-notification', 'User has fallen asleep');
}
