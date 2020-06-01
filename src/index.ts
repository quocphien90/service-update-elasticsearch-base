import './env';
import 'reflect-metadata';
import app from './app';
import logger from './common/logger';
import { Server, createServer } from 'http';
import createTypeOrmConnection from './common/connection';

const port = process.env.PORT || 3000;

createTypeOrmConnection().then(() => {
  const httpServer: Server = createServer(app);
  httpServer.keepAliveTimeout = 120 * 1000;
  httpServer.listen(port, () => logger.info(`Example app listening on port ${port}!`));
});
