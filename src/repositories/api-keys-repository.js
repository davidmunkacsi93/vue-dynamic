import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

export default class ApiKeysRepository {
  static async addApiKeys(apiKeys) {
    console.log(apiKeys);
    db.apiKeys.bulkAdd(apiKeys);
  }

  static async loadApiKeys() {
    return this.db.apiKeys.toArray();
  }
}
