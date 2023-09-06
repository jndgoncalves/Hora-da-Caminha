# SleepTight Discord Bot

The SleepTight Discord bot is designed to monitor user in voice channels fell asleep. If a user is detected to have fallen asleep, the bot sends a text message, plays a specific sound, and then removes the user from the voice channel. This bot enhances server interactions by providing a fun and interactive audio experience for users.

## Table of Contents

- [How It Works](#how-it-works)
- [Development & Configuration](#development--configuration)
- [Setup & Installation](#setup--installation)
- [Events](#events)
- [Dependencies](#dependencies)
- [Debugging with VS Code](#debugging-with-vs-code)
- [Contribution & Feedback](#contribution--feedback)
- [License](#license)
- [Contact](#contact)

## How It Works

The bot determines if a user has fallen asleep using a combination of wearable technology and mobile applications:

- **Xiaomi Mi Band 6**: This is the primary wearable device used for sleep detection. While the bot has been tested with the Mi Band 6, it may also be compatible with other models.
- **Notify for Mi Band**: This Android application detects when the Mi Band recognizes that the user has fallen asleep. Upon detection, it sends an intent signal.
- **Tasker**: Another Android application that receives the intent from "Notify for Mi Band". Once Tasker receives the intent, it triggers an action - specifically, making an HTTP request to the local server where the bot is running.
- **Bot Action**: Upon receiving the HTTP request from Tasker, the bot performs the following actions:
  1. Sends a goodbye message to a specified text channel within a designated guild.
  2. Removes the user from the voice channel.
  3. Plays a "goodnight" sound.

## Development & Configuration

- **TypeScript**: The bot is written in TypeScript, offering strong typing and OOP features.
- **ESLint**: The code is linted using ESLint to ensure code quality and consistency.
- **VS Code**: For developers using Visual Studio Code, there are specific configurations provided for a seamless development experience.

## Setup & Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jndgoncalves/SleepTight-discord-bot
   ```

2. **Navigate to the Directory**

   ```bash
   cd discord-bot
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Setup Environment Variables**
   Rename `.env.example` to `.env` and fill in the required variables, such as your Discord token and any other necessary configurations.

5. **Run the Bot**
   ```bash
   docker-compose up
   ```
6. **Wearable Device**
   Ensure you have the Xiaomi Mi Band (or a compatible device) set up and paired with your Android device.

7. **Notify for Mi Band**
   Install the Notify for Mi Band application on your Android device.
   Download and install the "Notify for Mi Band" application from here ([https://mibandnotify.com/](#)).
   Ensure the app has the necessary permissions to access your Mi Band's data.
   Important: Go to your phone's settings and make sure that "Notify for Mi Band" is allowed to run in the background and autostart on device boot.

8. **Tasker**
   Download and install the Tasker application from here ([https://tasker.joaoapps.com/](#)).
   Create an event, set action to "com.mc.miband.tasker.fellAsleep" (intent).
   Then create task, set action to "HTTP Request" and fill in the following details: Method GET and URL http://[IP of the server where the bot is running]:3000/fellAsleep.

   Important: Similarly, ensure Tasker is allowed to run in the background and autostart on device boot through your phone's settings.

## Events Handled

- **ready**: Initializes the bot and logs a message to the console.

## Dependencies

- **Discord.js**: Interact with the Discord API.
- **@discordjs/voice**: Handle voice connections in Discord.js.
- **dotenv**: Load environment variables from `.env`.
- **ts-node**: TypeScript execution for Node.js.
- **ffmpeg**: Handle multimedia data for audio playback in voice channels.

### DevDependencies

- **@typescript-eslint/eslint-plugin** and **@typescript-eslint/parser**: ESLint support for TypeScript.
- **eslint**: Lint ECMAScript/JavaScript code.
- **nodemon**: Monitor source changes and restart the server.
- **typescript**: Static types for JavaScript development.

## Debugging with VS Code

1. **Update docker-compose.yml**: Modify for debugging.
2. **Build and Start the Container**:

   ```bash
   docker-compose up
   ```

3. **Debug using VS Code**: Attach VS Code to the running Node.js process inside the container.

## Contribution & Feedback

Contributions are welcome! Fork the repository and submit a pull request for enhancements or fixes. For feedback or issues, use the GitHub issues section.

## License

This project is licensed under the MIT License.

## Contact

For inquiries or collaboration opportunities, reach out via GitHub issues or your preferred contact method.
