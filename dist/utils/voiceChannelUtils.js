"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndRemoveFromVoiceChannel = exports.removeUserFromVoiceChannel = exports.connectToVoiceChannel = exports.isUserInVoiceChannel = exports.fetchGuildMember = void 0;
const voice_1 = require("@discordjs/voice");
async function fetchGuildMember(guild, userID) {
    try {
        const member = await guild.members.fetch(userID);
        return member;
    }
    catch (error) {
        console.error('Error removing user from voice channel:', error);
        throw error;
    }
}
exports.fetchGuildMember = fetchGuildMember;
/**
 * Checks if a user is in a voice channel.
 *
 * @param {GuildMember} member - The member to check.
 * @returns {boolean} - Returns true if the user is in a voice channel, false otherwise.
 */
function isUserInVoiceChannel(member) {
    return member.voice.channel ? true : false;
}
exports.isUserInVoiceChannel = isUserInVoiceChannel;
function connectToVoiceChannel(newState) {
    return (0, voice_1.joinVoiceChannel)({
        channelId: newState.channelId,
        guildId: newState.guild.id,
        adapterCreator: newState.guild.voiceAdapterCreator,
    });
}
exports.connectToVoiceChannel = connectToVoiceChannel;
/**
 * Removes a user from their current voice channel.
 *
 * @param {GuildMember} member - The member to remove from the voice channel.
 * @returns {Promise<void>} - A promise that resolves when the member is removed from the voice channel.
 */
async function removeUserFromVoiceChannel(member) {
    if (isUserInVoiceChannel(member)) {
        try {
            await member.voice.disconnect('Removed from voice channel by bot.');
        }
        catch (error) {
            console.error('Error removing user from voice channel:', error);
        }
    }
}
exports.removeUserFromVoiceChannel = removeUserFromVoiceChannel;
async function fetchAndRemoveFromVoiceChannel(guild, userID) {
    const member = fetchGuildMember(guild, userID);
    if (member) {
        removeUserFromVoiceChannel(await member);
    }
}
exports.fetchAndRemoveFromVoiceChannel = fetchAndRemoveFromVoiceChannel;
//# sourceMappingURL=voiceChannelUtils.js.map