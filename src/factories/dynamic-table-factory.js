import { TABLE } from "../types/layout-item-types";
import { getLastURLSegment } from "../utils/helpers";
import ControlFactory from "./control-factory";

class DynamicTableFactory {
  createDynamicTable(path, httpMethod, apiMethod, apiModels) {
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

    dynamicTable.tableModel = this.getTableModel(apiMethod, apiModels);

    console.log(dynamicTable);

    return dynamicTable;
  }

  getTableModel(apiMethod, apiModels) {
    var responseOk = apiMethod.responses["200"];
    if (responseOk) {
      var modelRef;
      console.log(responseOk);
      if (responseOk.content) {
        modelRef = responseOk.content["application/json"].$ref;
      } else if (responseOk.schema) {
        modelRef = responseOk.schema.$ref || responseOk.schema.items.$ref;
      } else {
        throw new Error("Could not determine table model.");
      }
      var modelKey = getLastURLSegment(modelRef);
      return apiModels.find(model => model.type === modelKey);
    } else {
      throw new Error("Could not determine table model.");
    }
  }
}

const instance = new DynamicTableFactory();
Object.freeze(instance);
export default instance;
