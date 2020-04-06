import Dexie from 'dexie';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
db.version(1).stores({
  configurations: '++id,name,value',
  apiKeys: '++id,apiKey,parameterName,type,url'
});

export default class ApiKeysRepository {
  static async addApiKeys(apiKeys) {
    db.apiKeys.bulkAdd(apiKeys);
  }
}
