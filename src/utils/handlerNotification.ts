import SleepTightClient from '../SleepTightClient';
import { Application, Request, Response } from 'express';
import { sendChannelMessage } from './messages/sendChannelMessage';
import { sendDirectMessage } from './messages/sendDirectMessage';

export function handlerNotification(
  app: Application,
  SleepTightClient: SleepTightClient
) {
  const CHANNEL_ID = '1134812036673572889'; // Super Doraemon general channel
  const userID = '678385374195613706'; //Imperador Xinada

  /**
   * Sets up an Express endpoint to handle notifications and send messages to a Discord channel.
   *
   * @param {string} endpoint - The URL endpoint to listen for (e.g., '/sleep-notification').
   * @param {string} message - The prefix for the message to be sent to Discord (e.g., 'User has fallen asleep').
   */

  function registerEndpoint(endpoint: string, message: string) {
    app.get(endpoint, (req: Request, res: Response) => {
      // Get the current time in HH:mm:ss format.
      const currentTime = new Date().toLocaleTimeString();
      // Respond to the HTTP request indicating that the notification was sent to Discord.
      res.send(`${message}. Notification sent to Discord!`);
      console.log(`!${message}. Notification sent to Discord! ${currentTime}`);

      sendChannelMessage(SleepTightClient, CHANNEL_ID, message, currentTime);
      sendDirectMessage(SleepTightClient, userID, message, currentTime);
    });
  }
  registerEndpoint('/open-notes', 'User has open notes app');
  registerEndpoint('/open-instagram', 'User has open Instagram');
  registerEndpoint('/sleep-notification', 'User has fallen asleep');
}
