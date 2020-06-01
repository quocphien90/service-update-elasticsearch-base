import { ResponseItem, ResponseData, SimpleMap } from './interfaces';

const responseItem = (contentData: any, info: SimpleMap = {}): ResponseData => {
  const responseItem: ResponseItem = {
    item: contentData,
    info: info
  };

  return {
    status: true,
    data: responseItem
  };
};

export { responseItem };
