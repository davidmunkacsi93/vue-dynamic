import Dexie from 'dexie';
import { DB_NAME } from '../types/constants';

const IS_BOOTSTRAPPED_CONFIGURATION_NAME = 'isBootstrapped';
const db = new Dexie(DB_NAME);
db.version(1).stores({
  configurations: '++id,name,value',
  apiKeys: '++id,apiKey,parameterName,type,url'
});

export default class ConfigurationRepository {
  static async initializeConfigurations() {
    db.open();
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

  static async isApplicationBootstrapped() {
    db.open();
    const configuration = await db.configurations
      .where('name')
      .equals(IS_BOOTSTRAPPED_CONFIGURATION_NAME)
      .first();

    return configuration.value;
  }

  static async setBootstrapped() {
    db.configurations
      .where('name')
      .equals(IS_BOOTSTRAPPED_CONFIGURATION_NAME)
      .modify({ value: true });
  }
}
