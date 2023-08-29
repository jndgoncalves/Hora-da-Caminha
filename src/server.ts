import SleepTightClient from './SleepTightClient';
import { handlerNotification } from './utils/handlerNotification';
import express from 'express';

export function startServer(SleepTightClient: SleepTightClient) {
  const app = express();
  const PORT = 3001;

  handlerNotification(app, SleepTightClient);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
}
