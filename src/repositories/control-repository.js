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

  async deleteControlsByDynamicComponentId(dynamicComponentId) {
    const controls = await this.getControlsByDynamicComponentId(
      dynamicComponentId
    );

    controls.forEach((control) => {
      db.controls.delete(control.id);
    });
  }

  async getControlsByDynamicComponentId(dynamicComponentId) {
    return db.controls
      .where('dynamicComponentId')
      .equals(dynamicComponentId)
      .toArray();
  }

  async updateControl(control) {
    db.controls.update(control.id, control);
  }

  async updateControls(controls) {
    controls.forEach((control) => {
      this.updateControl(control);
    });
  }
}

const instance = new ControlRepository();
Object.freeze(instance);
export default instance;
