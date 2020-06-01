import express, { Express } from 'express';
import router from './routes';
import "reflect-metadata";
import { configureErrorHandler } from './common/middleware/handleError';

const ROOT = '/v2/product-hut-fe/';
const app: Express = express();

app.use(`${ROOT}`, router);

configureErrorHandler(app);
export default app;
