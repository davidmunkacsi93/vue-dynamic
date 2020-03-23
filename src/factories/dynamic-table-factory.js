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
        let jsonResponse = responseOk.content["application/json"];
        modelRef = jsonResponse.$ref || jsonResponse.schema.$ref;
      } else if (responseOk.schema) {
        if (!responseOk.schema.$ref && !responseOk.schema.items) {
          return {};
        }
        modelRef = responseOk.schema.$ref || responseOk.schema.items.$ref;
      } else {
        return {};
      }
      console.log(modelRef);
      var modelKey = getLastURLSegment(modelRef);
      return apiModels.find(model => model.type === modelKey);
    } else {
      return {};
    }
  }
}

const instance = new DynamicTableFactory();
Object.freeze(instance);
export default instance;
