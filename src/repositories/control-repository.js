import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class ControlRepository {
  async addControls(dynamicComponentId, controls) {
    for (var control of controls) {
      control.dynamicComponentId = dynamicComponentId;
      db.controls.add(control);
    }
  }

  async getControlsByDynamicComponentId(dynamicComponentId) {
    return db.controls
      .where('dynamicComponentId')
      .equals(dynamicComponentId)
      .toArray();
  }
}

const instance = new ControlRepository();
Object.freeze(instance);
export default instance;
