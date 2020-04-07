import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class ApiKeysRepository {
  async addApiKeys(apiKeys) {
    db.apiKeys.bulkAdd(apiKeys);
  }

  async loadApiKeys() {
    return db.apiKeys.toArray();
  }

  async addApiKey(apiKey) {
    db.apiKeys.add(apiKey);
  }

  async getApiKeyByUrl(url) {
    return db.apiKeys.where('url').equals(url).first();
  }
}

const instance = new ApiKeysRepository();
Object.freeze(instance);

export default instance;
