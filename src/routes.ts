import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { Middleware } from 'microservice-utility-vn-node';

import healthCheckRouter from './health/controller';
import mappingsRouter from './controller/index';

const router: Router = express.Router();
const upload = multer();
router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());
router.use(upload.none()); 

router.use('/health', healthCheckRouter);
router.use('/mappings', [Middleware.clientFetcherMiddleware.handle()], mappingsRouter);

export default router;