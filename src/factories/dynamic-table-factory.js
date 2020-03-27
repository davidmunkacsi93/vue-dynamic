import { TABLE } from "../types/layout-item-types";
import ControlFactory from "./control-factory";

class DynamicTableFactory {
  createDynamicTable(path, httpMethod, apiMethod) {
    var dynamicTable = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      tags: apiMethod.tags,
      type: TABLE,
      controls: []
    };

    if (apiMethod.parameters) {
      var controls = ControlFactory.createControlsForParameters(apiMethod);
      dynamicTable.controls = controls;
    }

    console.log(dynamicTable);

    return dynamicTable;
  }
}

const instance = new DynamicTableFactory();
Object.freeze(instance);
export default instance;
