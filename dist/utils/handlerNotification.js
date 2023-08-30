"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerNotification = void 0;
const sendChannelMessage_1 = require("./messages/sendChannelMessage");
const voiceChannelUtils_1 = require("./voiceChannelUtils");
const audioUtils_1 = require("./audioUtils");
const voice_1 = require("@discordjs/voice");
async function handlerNotification(app, SleepTightClient) {
    const textChannelID = '1134812036673572889'; // Super Doraemon general channel
    // const userXinada = '678385374195613706'; //Imperador Xinada
    const userZikmix = '123605053335404547'; //Zikmix
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
            const guild = SleepTightClient.guilds.cache.get(process.env.GUILD_ID);
            const channel = SleepTightClient.channels.cache.get(textChannelID);
            const memberZikmix = (0, voiceChannelUtils_1.fetchGuildMember)(guild, userZikmix);
            const connection = (0, voice_1.getVoiceConnection)(guild.id);
            // const voiceChannel = guild!.members.cache.get(userXinada)!.voice.channel;
            // Respond to the HTTP request indicating that the notification was sent to Discord.
            res.send(`${message}. Notification sent to Discord!`);
            console.log(`!${message}. Notification sent to Discord! ${currentTime}`);
            (0, sendChannelMessage_1.sendChannelMessage)(channel, message);
            if ((0, voiceChannelUtils_1.isUserInVoiceChannel)(await memberZikmix)) {
                (0, audioUtils_1.playAudio)(connection, './public/sounds/dormebem.mp3');
                (0, voiceChannelUtils_1.removeUserFromVoiceChannel)(await memberZikmix);
            }
        });
    }
    registerEndpoint('/open-notes', 'User has open notes app');
    registerEndpoint('/sleep-notification', 'User has fallen asleep');
}
exports.handlerNotification = handlerNotification;
//# sourceMappingURL=handlerNotification.js.map