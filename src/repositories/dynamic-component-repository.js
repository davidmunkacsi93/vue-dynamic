import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import ControlRepository from '../repositories/control-repository';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class DynamicComponentRepository {
  async addDynamicComponent(apiModelId, dynamicComponent) {
    var controls = dynamicComponent.controls;
    dynamicComponent.apiModelId = apiModelId;

    db.dynamicComponents.add(dynamicComponent).then((dynamicComponentId) => {
      ControlRepository.addControls(dynamicComponentId, controls);
    });
  }

  async addDynamicComponents(apiModelId, dynamicComponents) {
    for (var dynamicComponent of dynamicComponents) {
      this.addDynamicComponent(apiModelId, dynamicComponent);
    }
  }

  async updateDynamicComponent(dynamicComponent) {
    return db.dynamicComponents.update(dynamicComponent.id, dynamicComponent);
  }

  async getDynamicComponentsByApiModelId(apiModelId) {
    return db.dynamicComponents
      .where('apiModelId')
      .equals(apiModelId)
      .toArray();
  }
}

const instance = new DynamicComponentRepository();
Object.freeze(instance);
export default instance;
