import { createConnection, Connection, getConnectionOptions } from 'typeorm';
import { SimpleMap } from './interfaces';

const createTypeOrmConnection = async (
  overwrite: SimpleMap = {}
): Promise<Connection> => {
  const option = await getConnectionOptions(process.env.NODE_ENV || 'default');
  return createConnection({ ...option, name: 'default', ...overwrite });
};

export default createTypeOrmConnection;
