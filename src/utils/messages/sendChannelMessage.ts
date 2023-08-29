import SleepTightClient from '../../SleepTightClient';

export function sendChannelMessage(
  SleepTightClient: SleepTightClient,
  ChannelID: string,
  message: string,
  currentTime: string
) {
  // Fetch the specified Discord text channel using its ID.
  const textChannel = SleepTightClient.channels.cache.get(ChannelID);
  if (textChannel?.isTextBased()) {
    textChannel.send(`${message} at ${currentTime}!`);
  }
}
