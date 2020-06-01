import { Client } from '../common/interfaces';

import JapanHandler from './jp';
import SingaporeHandler from './sg';
import PhillipinesHandler from './ph';
import BaseHandler from './index';

const createFactory = (clientId: number) => {
  let handler;

  switch (clientId) {
    case Client.CLIENT_JAPAN:
      handler = new JapanHandler(clientId);
      break;
    case Client.CLIENT_SINGAPORE:
      handler = new SingaporeHandler(clientId);
      break;
    case Client.CLIENT_PHILLIPINES:
      handler = new PhillipinesHandler(clientId);
      break;
    default:
      handler = new BaseHandler(clientId);
  }
  return handler;
};

export default createFactory;
