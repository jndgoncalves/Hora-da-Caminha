"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// Import the custom SuperDoraemonClient class
const SuperDoraemonClient_1 = __importDefault(require("../SuperDoraemonClient"));
const express_1 = __importDefault(require("express"));
module.exports = {
    name: discord_js_1.Events.ClientReady,
    // Set the 'once' property to true, indicating that this event should only be triggered once
    once: true,
    // Function to execute when the ClientReady event is triggered
    execute(client = new SuperDoraemonClient_1.default()) {
        const app = (0, express_1.default)();
        const PORT = 3000;
        const CHANNEL_ID = '1134812036673572889';
        // Log a message to the console indicating the bot's username and tag when it's successfully logged in
        console.log(`Logged in as ${client.user?.tag}!`);
        function handleNotification(endpoint, messagePrefix) {
            app.get(`${endpoint}`, (req, res) => {
                const currentTime = new Date().toLocaleTimeString();
                const textChannel = client.channels.cache.get(CHANNEL_ID);
                if (textChannel?.isTextBased()) {
                    textChannel.send(`${messagePrefix} at ${currentTime}!`);
                }
                res.send(`${messagePrefix} Notification sent to Discord!`);
                console.log(`!${messagePrefix} Notification sent to Discord! ${currentTime}`);
            });
        }
        handleNotification('/sleep-notification', 'User has fallen asleep');
        handleNotification('/open-notes', 'User has open notes app');
        handleNotification('/open-instagram', 'User has open Instagram');
        // app.get('/sleep-notification', (req, res) => {
        //   const currentTime = new Date().toLocaleTimeString();
        //   const textChannel = client.channels.cache.get('1134812036673572889');
        //   if (textChannel?.isTextBased()) {
        //     textChannel.send(`User has fallen asleep at ${currentTime}!`);
        //   }
        //   res.send('Sleep Notification sent to Discord!');
        //   console.log(`!Sleep Notification sent to Discord! $currentTime}`);
        // });
        // app.get('/open-notes', (req, res) => {
        //   const currentTime = new Date().toLocaleTimeString();
        //   const textChannel = client.channels.cache.get('1134812036673572889');
        //   if (textChannel?.isTextBased()) {
        //     textChannel.send(`User has open notes app at ${currentTime}!`);
        //   }
        //   res.send('Notes Notification sent to Discord!');
        //   console.log(`!Notes Notification sent to Discord! ${currentTime}`);
        // });
        // app.get('/open-instagram', (req, res) => {
        //   const currentTime = new Date().toLocaleTimeString();
        //   const textChannel = client.channels.cache.get('1134812036673572889');
        //   if (textChannel?.isTextBased()) {
        //     textChannel.send(`User has open Instagram at ${currentTime}!`);
        //   }
        //   res.send('Instagram Notification sent to Discord!');
        //   console.log(`!Instagram Notification sent to Discord! ${currentTime}}`);
        // });
        app.listen(PORT, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    },
};
//# sourceMappingURL=ready.js.map