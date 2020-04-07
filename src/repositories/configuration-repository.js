import Dexie from 'dexie';
import IndexedDbSchemaProvider from '../providers/indexed-db-schema-provider';
import { DB_NAME } from '../types/constants';

const IS_BOOTSTRAPPED_CONFIGURATION_NAME = 'isBootstrapped';
const db = new Dexie(DB_NAME);
var schema = IndexedDbSchemaProvider.getSchema();
db.version(1).stores(schema);

class ConfigurationRepository {
  async initializeConfigurations() {
    const configuration = await db.configurations
      .where('name')
      .equals(IS_BOOTSTRAPPED_CONFIGURATION_NAME)
      .first();

    if (!configuration) {
      db.configurations.add({
        name: IS_BOOTSTRAPPED_CONFIGURATION_NAME,
        value: false
      });
    }
  }

  async isApplicationBootstrapped() {
    const configuration = await db.configurations
      .where('name')
      .equals(IS_BOOTSTRAPPED_CONFIGURATION_NAME)
      .first();

    return configuration.value;
  }

  async setBootstrapped() {
    db.configurations
      .where('name')
      .equals(IS_BOOTSTRAPPED_CONFIGURATION_NAME)
      .modify({ value: true });
  }
}

const instance = new ConfigurationRepository();
Object.freeze(instance);
export default instance;
