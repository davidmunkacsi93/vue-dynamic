import DynamicFormFactory from "../factories/dynamic-form-factory";

class DynamicComponentFactory {
  createDynamicComponents(apiPaths, apiModels) {
    var dynamicComponents = [];

    for (var path in apiPaths) {
      var apiEndpoint = apiPaths[path];

      for (var httpMethod in apiEndpoint) {
        var apiMethod = apiEndpoint[httpMethod];
        var dynamicComponent = {};

        if (httpMethod === "get") {
          // Based on the parameters specified generate a search form,
          // that transform into a grid / list / input based on the response type.
        } else if (
          httpMethod === "post" ||
          httpMethod === "delete" ||
          httpMethod === "put"
        ) {
          dynamicComponent = DynamicFormFactory.createDynamicForm(
            path,
            httpMethod,
            apiMethod,
            apiModels
          );
        } else {
          console.log(httpMethod);
          console.error("Not supported HTTP method.");
        }

        dynamicComponents.push(dynamicComponent);
      }
    }
    return dynamicComponents;
  }
}

const instance = new DynamicComponentFactory();
Object.freeze(instance);
export default instance;
