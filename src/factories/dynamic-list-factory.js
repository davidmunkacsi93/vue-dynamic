class DynamicListFactory {
  createDynamicList() {}
}

const instance = new DynamicListFactory();
Object.freeze(instance);
export default instance;
