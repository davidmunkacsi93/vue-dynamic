import { TREE } from "../types/layout-item-types";

import ControlFactory from "./control-factory";

class DynamicTreeFactory {
  createDynamicTree(path, httpMethod, apiMethod) {
    var dynamicTree = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      tags: apiMethod.tags,
      type: TREE,
      controls: []
    };

    if (apiMethod.parameters) {
      var controls = ControlFactory.createControlsForParameters(apiMethod);
      dynamicTree.controls = controls;
    }

    console.log(dynamicTree);

    return dynamicTree;
  }
}

const instance = new DynamicTreeFactory();
Object.freeze(instance);
export default instance;
