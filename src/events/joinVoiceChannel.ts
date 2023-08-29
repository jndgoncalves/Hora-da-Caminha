import { VoiceState } from 'discord.js';
import { playAudio } from '../utils/audioUtils';
import { joinVoiceChannel } from '@discordjs/voice';

module.exports = {
  name: 'voiceStateUpdate',
  // Asynchronous function to execute when the voiceStateUpdate event is triggered
  async execute(oldState: VoiceState, newState: VoiceState) {
    // Check if the user is not a bot
    // If it's a bot, exit the function early to avoid processing bot voice state changes
    if (newState.member?.user.bot) return;

    // Check if the user has joined a voice channel (not just switched channels)
    if (!oldState.channelId && newState.channelId) {
      // Join the voice channel the user has entered
      const connection = joinVoiceChannel({
        channelId: newState.channelId,
        guildId: newState.guild.id,
        adapterCreator: newState.guild.voiceAdapterCreator,
      });

      // Use thr plauAudio() function to play an MP3 file
      // playAudio(connection, './public/sounds/welcome-traveler.mp3');

      

      // Disconnect after 5 seconds
      // setTimeout(() => {
      //   connection.disconnect();
      // }, 5000);
    }
  },
};
