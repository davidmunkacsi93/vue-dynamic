import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import DynamicComponentRepository from '../repositories/dynamic-component-repository';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class ApiModelRepository {
  async addApiModel(apiModel) {
    var dynamicComponents = apiModel.dynamicComponents;

    db.apiModels.add(apiModel).then((apiModelId) => {
      DynamicComponentRepository.addDynamicComponents(
        apiModelId,
        dynamicComponents
      );
    });
  }

  async addApiModels(apiModels) {
    for (var apiModel of apiModels) {
      this.addApiModel(apiModel);
    }
  }

  async getApiModels() {
    return db.apiModels.toArray();
  }
}

const instance = new ApiModelRepository();
Object.freeze(instance);
export default instance;
