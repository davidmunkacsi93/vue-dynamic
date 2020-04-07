import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class DynamicComponentRepository {
  async addDynamicComponents(dynamicComponents) {
    db.dynamicComponents.bulkAdd(dynamicComponents);
  }
}

const instance = new DynamicComponentRepository();
Object.freeze(instance);
export default instance;
