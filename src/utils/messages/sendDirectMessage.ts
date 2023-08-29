import SleepTightClient from '../../SleepTightClient';

export function sendDirectMessage(
  SleepTightClient: SleepTightClient,
  userID: string,
  messagePrefix: string,
  currentTime: string
) {

  // Fetch the user using the provided user ID
  SleepTightClient.users
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
}
