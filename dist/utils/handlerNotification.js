"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerNotification = void 0;
const sendChannelMessage_1 = require("./messages/sendChannelMessage");
const voiceChannelUtils_1 = require("./voiceChannelUtils");
const audioUtils_1 = require("./audioUtils");
const voice_1 = require("@discordjs/voice");
async function handlerNotification(app, SleepTightClient) {
    /**
     * Sets up an Express endpoint to handle notifications and send messages to a Discord channel.
     *
     * @param {string} endpoint - The URL endpoint to listen for (e.g., '/sleep-notification').
     * @param {string} message - The prefix for the message to be sent to Discord (e.g., 'User has fallen asleep').
     */
    function registerEndpoint(endpoint, message) {
        app.get(endpoint, async (req, res) => {
            // Get the current time in HH:mm:ss format.
            const currentTime = new Date().toLocaleTimeString();
            // Text channel where the bot will send messages.
            const channel = SleepTightClient.channels.cache.get(process.env.TEXT_CHANNEL_ID);
            const guild = SleepTightClient.guilds.cache.get(process.env.GUILD_ID);
            // User ID of the user to kicked from the voice channel.
            const sleepingUser = (0, voiceChannelUtils_1.fetchGuildMember)(guild, process.env.USER_ID);
            // Respond to the HTTP request indicating that the notification was sent to Discord.
            res.send(`${message}. Notification sent to Discord!`);
            console.log(`!${message}. Notification sent to Discord! ${currentTime}`);
            (0, sendChannelMessage_1.sendChannelMessage)(channel, message);
            if ((0, voiceChannelUtils_1.isUserInVoiceChannel)(await sleepingUser)) {
                const voiceChannel = (await sleepingUser).voice.channel;
                const connection = (0, voice_1.joinVoiceChannel)({
                    channelId: voiceChannel.id,
                    guildId: guild.id,
                    adapterCreator: guild.voiceAdapterCreator,
                });
                (0, audioUtils_1.playAudio)(connection, './public/sounds/dormebem.mp3');
                (0, voiceChannelUtils_1.removeUserFromVoiceChannel)(await sleepingUser);
            }
        });
    }
    registerEndpoint('/open-notes', 'User has open notes app');
    registerEndpoint('/sleep-notification', 'User has fallen asleep');
}
exports.handlerNotification = handlerNotification;
//# sourceMappingURL=handlerNotification.js.map