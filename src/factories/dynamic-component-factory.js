import DynamicFormFactory from "../factories/dynamic-form-factory";
import DynamicListFactory from "../factories/dynamic-list-factory";
import { FORM, GRID, LIST } from "../types/layout-item-types";

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
          case LIST:
            dynamicComponent = DynamicListFactory.createDynamicList(
              path,
              httpMethod,
              apiMethod,
              apiModels
            );
            break;
          case FORM:
            dynamicComponent = DynamicFormFactory.createDynamicForm(
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
        var content = responseOk.content;
        if (content) {
          var schema = content["application/json"].schema;
          if (schema.$ref) {
            return GRID;
          } else if (schema.type) {
            switch (schema.type) {
              case "array":
                break;
              case "string":
                return LIST;
            }
          }
        }
      }
    } else if (
      httpMethod === "post" ||
      httpMethod === "delete" ||
      httpMethod === "put"
    ) {
      return FORM;
    } else {
      throw new Error("Not supported HTTP method.");
    }
  }
}

const instance = new DynamicComponentFactory();
Object.freeze(instance);
export default instance;
