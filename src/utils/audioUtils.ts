import {
  AudioPlayerStatus,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
} from '@discordjs/voice';
import fs from 'fs';

export function playAudio(connection: VoiceConnection, audioPath: string) {
  // Create a new audio player instance
  const player = createAudioPlayer();
  // Create an audio resource from the specified MP3 file using a readable stream
  const resource = createAudioResource(fs.createReadStream(audioPath));

  // Subscribe the connection to the audio player, allowing audio to be played in the voice channel
  connection.subscribe(player);
  player.play(resource);

  // Listen for the 'Idle' event on the audio player, which indicates that audio playback has finished
  player.on(AudioPlayerStatus.Idle, () => {
    connection.disconnect();
  });
}
