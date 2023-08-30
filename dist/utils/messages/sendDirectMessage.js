"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDirectMessage = void 0;
function sendDirectMessage(SleepTightClient, userID, messagePrefix, currentTime) {
    // Fetch the user using the provided user ID
    SleepTightClient.users
        .fetch(userID)
        .then((user) => {
        // Send a direct message to the fetched user
        return user.send(`${messagePrefix}!`);
    })
        .then(() => {
        console.log(`${messagePrefix} at ${currentTime}!`);
    })
        .catch((error) => {
        console.error('Error sending the direct message:', error);
    });
}
exports.sendDirectMessage = sendDirectMessage;
//# sourceMappingURL=sendDirectMessage.js.map