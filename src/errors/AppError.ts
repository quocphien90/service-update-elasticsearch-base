import { SimpleMap } from '../common/interfaces';
export interface BusinessError {
  status: boolean;
  error: {
    code: string;
    message: string;
    info: any;
    data: any[] | SimpleMap;
  };
}
export interface ValidationAppError {
  status: boolean;
  error: {
    code: string;
    message: string;
    info: any;
    data: {
      [k: string]: any;
    };
  };
}
export class AppError extends Error {
  public errorCode: any;
  errorMessage: string;
  data: SimpleMap | null;
  info: SimpleMap | null;
  constructor(
    errorCode: any,
    message: string,
    data?: SimpleMap,
    info?: SimpleMap
  ) {
    super(errorCode);
    this.errorCode = errorCode;
    this.name = AppError.name;
    this.errorMessage = message;
    this.data = data || null;
    this.info = info || null;
  }
}
