import { Request, Response, NextFunction } from 'express';

import BaseHandler from '../handler'
import createFactory from '../handler/factory';

export const updateElasticSearch = async (req: any, res: Response, done: NextFunction) => {
  const clientId = req.clientId;
  try {
    const handler: BaseHandler = createFactory(clientId);
    const outletCode = (req.body.outlet_code != undefined && req.body.outlet_code != '') ? req.body.outlet_code : '';
    console.log(req.body.outlet_code);
    await handler.proccessUpdateElasticSearch();
  } catch (error) {
    done(error);
  }
}
