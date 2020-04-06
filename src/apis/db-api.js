import Dexie from 'dexie';

const DB_NAME = 'VueDynamic';

export default class DbApi {
  static initializeDb() {
    const db = new Dexie(DB_NAME);
    db.version(1).stores({
      configurations: '++id,name,value'
    });
    db.configurations.add({ name: 'IsBootstrapped', value: false });
  }
}
