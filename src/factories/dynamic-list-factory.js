import { LIST } from "../types/layout-item-types";

import ControlFactory from "./control-factory";

class DynamicListFactory {
  createDynamicList(path, httpMethod, apiMethod) {
    var dynamicList = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      type: LIST,
      searchParameterControls: []
    };

    if (apiMethod.parameters) {
      var searchParameterControls = ControlFactory.createControlsForParameters(
        apiMethod
      );
      dynamicList.searchParameterControls = searchParameterControls;
    }

    dynamicList.listType = this.getListType(apiMethod);

    console.log(dynamicList);

    return dynamicList;
  }

  getListType(apiMethod) {
    var responseOk = apiMethod.responses["200"];
    if (responseOk) {
      if (responseOk.content) {
        return responseOk.content["application/json"].schema.items.type;
      } else if (responseOk.schema) {
        if (responseOk.schema.items) {
          return responseOk.schema.items.type;
        } else {
          return responseOk.schema.type;
        }
      } else {
        throw new Error("Could not determine list type.");
      }
    } else {
      throw new Error("Could not determine list type.");
    }
  }
}

const instance = new DynamicListFactory();
Object.freeze(instance);
export default instance;
