import { joinVoiceChannel } from '@discordjs/voice';
import { Guild, GuildMember, VoiceState } from 'discord.js';

export async function fetchGuildMember(
  guild: Guild,
  userID: string
): Promise<GuildMember> {
  try {
    const member = await guild.members.fetch(userID);
    return member;
  } catch (error) {
    console.error('Error removing user from voice channel:', error);
    throw error;
  }
}

/**
 * Checks if a user is in a voice channel.
 *
 * @param {GuildMember} member - The member to check.
 * @returns {boolean} - Returns true if the user is in a voice channel, false otherwise.
 */
export function isUserInVoiceChannel(member: GuildMember): boolean {
  return member.voice.channel ? true : false;
}

export function connectToVoiceChannel(newState: VoiceState) {
  return joinVoiceChannel({
    channelId: newState.channelId!,
    guildId: newState.guild.id,
    adapterCreator: newState.guild.voiceAdapterCreator,
  });
}

/**
 * Removes a user from their current voice channel.
 *
 * @param {GuildMember} member - The member to remove from the voice channel.
 * @returns {Promise<void>} - A promise that resolves when the member is removed from the voice channel.
 */
export async function removeUserFromVoiceChannel(
  member: GuildMember
): Promise<void> {
  if (isUserInVoiceChannel(member)) {
    try {
      await member.voice.disconnect('Removed from voice channel by bot.');
    } catch (error) {
      console.error('Error removing user from voice channel:', error);
    }
  }
}

export async function fetchAndRemoveFromVoiceChannel(
  guild: Guild,
  userID: string
) {
  const member = fetchGuildMember(guild, userID);
  if (member) {
    removeUserFromVoiceChannel(await member);
  }
}
