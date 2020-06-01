import { Express, NextFunction, Request, Response } from 'express';
import {
  AppError,
  BusinessError,
  ValidationAppError
} from '../../errors/AppError';
import { constants } from 'http2';

function handleAppError(err: AppError): BusinessError {
  const { errorCode, errorMessage, data, info } = err;
  return {
    status: false,
    error: {
      code: errorCode,
      message: errorMessage,
      data: data || [],
      info: info || {}
    }
  };
}

function isAppError(object: any): object is AppError {
  return 'errorCode' in object;
}
export function configureErrorHandler(app: Express) {
  app.use(
    (
      err: AppError | any,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      let errorDetails;
     
      if (isAppError(err)) {
        errorDetails = handleAppError(err);
      }
      if (!errorDetails) {
        errorDetails = err;
      }
      res.status(constants.HTTP_STATUS_BAD_REQUEST).json(errorDetails);
      next(err);
    }
  );
}
