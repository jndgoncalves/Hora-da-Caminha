"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const handlerNotification_1 = require("./utils/handlerNotification");
const express_1 = __importDefault(require("express"));
function startServer(SleepTightClient) {
    const app = (0, express_1.default)();
    const PORT = 3001;
    (0, handlerNotification_1.handlerNotification)(app, SleepTightClient);
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
}
exports.startServer = startServer;
//# sourceMappingURL=server.js.map