import SleepTightClient from './SleepTightClient';
import { handlerNotification } from './utils/handlerNotification';
import express from 'express';

export function startServer(SleepTightClient: SleepTightClient) {
  const app = express();
  const { PORT } = process.env;
  handlerNotification(app, SleepTightClient);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}
