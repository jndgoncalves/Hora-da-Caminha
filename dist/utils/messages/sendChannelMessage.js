"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChannelMessage = void 0;
const discord_js_1 = require("discord.js");
function sendChannelMessage(channel, message) {
    // Fetch the specified Discord text channel using its ID.
    if (!(channel instanceof discord_js_1.TextChannel)) {
        console.error(`Channel  is not a text channel or not found.`);
    }
    else {
        if (channel.isTextBased())
            channel.send(`${message}!`);
    }
}
exports.sendChannelMessage = sendChannelMessage;
//# sourceMappingURL=sendChannelMessage.js.map