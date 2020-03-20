import { GRID } from "../types/layout-item-types";
import { getLastURLSegment } from "../utils/helpers";
import ControlFactory from "./control-factory";

class DynamicGridFactory {
  createDynamicGrid(path, httpMethod, apiMethod, apiModels) {
    var dynamicGrid = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      tags: apiMethod.tags,
      type: GRID,
      controls: []
    };

    if (apiMethod.parameters) {
      var controls = ControlFactory.createControlsForParameters(apiMethod);
      dynamicGrid.controls = controls;
    }

    dynamicGrid.gridModel = this.getGridModel(apiMethod, apiModels);

    console.log(dynamicGrid);

    return dynamicGrid;
  }

  getGridModel(apiMethod, apiModels) {
    var responseOk = apiMethod.responses["200"];
    if (responseOk) {
      var modelRef;
      console.log(responseOk);
      if (responseOk.content) {
        modelRef = responseOk.content["application/json"].$ref;
      } else if (responseOk.schema) {
        modelRef = responseOk.schema.$ref || responseOk.schema.items.$ref;
      } else {
        throw new Error("Could not grid model.");
      }
      var modelKey = getLastURLSegment(modelRef);
      return apiModels.find(model => model.type === modelKey);
    } else {
      throw new Error("Could not grid model.");
    }
  }
}

const instance = new DynamicGridFactory();
Object.freeze(instance);
export default instance;
