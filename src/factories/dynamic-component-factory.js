import ControlFactory from "../factories/control-factory";
import DynamicFormFactory from "../factories/dynamic-form-factory";
import DynamicTreeFactory from "./dynamic-tree-factory";
import DynamicTableFactory from "../factories/dynamic-table-factory";

import { FORM, TABLE, TREE } from "../types/layout-item-types";

class DynamicComponentFactory {
  createDynamicComponents(apiPaths, apiModels) {
    var dynamicComponents = [];
    var supportedHttpMethods = ["get", "post", "put", "delete"];

    for (var path in apiPaths) {
      var apiEndpoint = apiPaths[path];

      for (var httpMethod in apiEndpoint) {
        if (!supportedHttpMethods.includes(httpMethod)) continue;

        var apiMethod = apiEndpoint[httpMethod];
        var dynamicComponent = {};

        var dynamicComponentType = this.getDynamicComponentType(
          httpMethod,
          apiMethod
        );
        console.log(dynamicComponentType);
        switch (dynamicComponentType) {
          case FORM:
            dynamicComponent = DynamicFormFactory.createDynamicForm(
              path,
              httpMethod,
              apiMethod,
              apiModels
            );
            break;
          case TABLE:
            dynamicComponent = DynamicTableFactory.createDynamicTable(
              path,
              httpMethod,
              apiMethod,
              apiModels
            );
            break;
          case TREE:
            console.log(apiMethod);
            dynamicComponent = DynamicTreeFactory.createDynamicTree(
              path,
              httpMethod,
              apiMethod,
              apiModels
            );
            break;
        }
        dynamicComponents.push(dynamicComponent);
      }
      if (apiEndpoint.parameters) {
        var controlsForEndpointParameters = ControlFactory.createControlsForEndpointParameters(
          apiEndpoint.parameters
        );

        dynamicComponents.forEach(component => {
          if (!component.controls) component.controls = [];
          component.controls.push(controlsForEndpointParameters);
        });
      }
    }
    return dynamicComponents;
  }
  getDynamicComponentType(httpMethod, apiMethod) {
    if (httpMethod === "get") {
      var responseOk = apiMethod.responses["200"];
      if (responseOk) {
        if (responseOk.content) {
          return this.getDynamicComponentTypeForSchema(
            responseOk.content["application/json"].schema
          );
        } else if (responseOk.schema) {
          return this.getDynamicComponentTypeForSchema(responseOk.schema);
        } else {
          return FORM;
        }
      } else {
        return FORM;
      }
    } else if (
      httpMethod === "post" ||
      httpMethod === "delete" ||
      httpMethod === "put"
    ) {
      return FORM;
    } else {
      console.log(httpMethod);
      throw new Error(`${httpMethod} - not supported HTTP method.`);
    }
  }

  getDynamicComponentTypeForSchema(schema) {
    if (schema.$ref) {
      return TABLE;
    } else if (schema.type) {
      switch (schema.type) {
        case "array":
          if (schema.items.type === "string") {
            return TREE;
          } else if (schema.items.$ref) {
            return TABLE;
          }
          break;
        case "string":
          return TREE;
      }
    }

    return TABLE;
  }
}

const instance = new DynamicComponentFactory();
Object.freeze(instance);
export default instance;
