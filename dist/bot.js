"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const SleepTightClient_1 = __importDefault(require("./SleepTightClient"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create a new instance of SleepTightClient
const client = new SleepTightClient_1.default();
// Define the path to the events folder
const eventsPath = node_path_1.default.join(__dirname, 'events');
const eventFiles = node_fs_1.default
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts'));
(async () => {
    for (const file of eventFiles) {
        const filePath = node_path_1.default.join(eventsPath, file);
        // Dynamically import the event from the current file
        const event = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
        // Check if the event has a property 'once' set to true
        // If true, the event listener will be triggered only once
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            // If the event does not have the 'once' property or it's set to false
            // The event listener will be triggered every time the event occurs
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
})();
// Log in to Discord with your bot token
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=bot.js.map