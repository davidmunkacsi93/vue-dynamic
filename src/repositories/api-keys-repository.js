import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

export default class ApiKeysRepository {
  static async addApiKeys(apiKeys) {
    db.apiKeys.bulkAdd(apiKeys);
  }

  static async loadApiKeys() {
    return db.apiKeys.toArray();
  }

  static async addApiKey(apiKey) {
    db.apiKeys.add(apiKey);
  }
}
