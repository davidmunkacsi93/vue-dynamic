import { LIST } from "../types/layout-item-types";

class DynamicListFactory {
  createDynamicList(path, httpMethod, apiMethod, apiModels) {
    var dynamicList = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      type: LIST
    };

    return dynamicList;
  }
}

const instance = new DynamicListFactory();
Object.freeze(instance);
export default instance;
