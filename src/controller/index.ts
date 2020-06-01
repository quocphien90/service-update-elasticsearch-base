import express, { Router } from 'express';
import {updateElasticSearch} from './updateElasticSearch';

const router: Router = express.Router();

// @ts-ignore
router.route('/refresh-es').post(updateElasticSearch);

export default router;
