import DynamicFormFactory from "../factories/dynamic-form-factory";
import DynamicListFactory from "../factories/dynamic-list-factory";
import DynamicTableFactory from "../factories/dynamic-table-factory";

import {
  FORM,
  TABLE,
  LIST,
  SEARCH_FORM,
  READ_ONLY_FORM
} from "../types/layout-item-types";

class DynamicComponentFactory {
  createDynamicComponents(apiPaths, apiModels) {
    var dynamicComponents = [];

    for (var path in apiPaths) {
      var apiEndpoint = apiPaths[path];

      for (var httpMethod in apiEndpoint) {
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
          case SEARCH_FORM:
            break;
          case LIST:
            console.log(apiMethod);
            dynamicComponent = DynamicListFactory.createDynamicList(
              path,
              httpMethod,
              apiMethod,
              apiModels
            );
            break;
        }
        dynamicComponents.push(dynamicComponent);
      }
    }
    return dynamicComponents;
  }
  getDynamicComponentType(httpMethod, apiMethod) {
    if (httpMethod === "get") {
      // Based on the parameters specified generate a search form,
      // that transform into a grid / list / input based on the response type.
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
      return READ_ONLY_FORM;
    } else if (schema.type) {
      switch (schema.type) {
        case "array":
          if (schema.items.type === "string") {
            return LIST;
          } else if (schema.items.$ref) {
            return TABLE;
          }
          break;
        case "string":
          return LIST;
      }
    }

    return SEARCH_FORM;
  }
}

const instance = new DynamicComponentFactory();
Object.freeze(instance);
export default instance;
