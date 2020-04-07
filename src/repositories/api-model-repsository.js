import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class ApiModelRepository {
  async addApiModel(apiModel) {
    db.apiModels.add(apiModel);
  }

  async addApiModels(apiModels) {
    db.apiModels.bulkAdd(apiModels);
  }

  async getApiModels() {
    return db.apiModels.toArray();
  }
}

const instance = new ApiModelRepository();
Object.freeze(instance);
export default instance;
