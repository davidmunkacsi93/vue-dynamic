import ControlFactory from '../factories/control-factory';
import DynamicFormFactory from '../factories/dynamic-form-factory';
import DynamicSearchFormFactory from '../factories/dynamic-search-form-factory';
import { FORM, SEARCH_FORM } from '../types/layout-item-types';

export default class DynamicComponentFactory {
  static createDynamicComponents(apiPaths, apiModels) {
    var dynamicComponents = [];
    var supportedHttpMethods = ['get', 'post', 'put', 'delete'];

    for (var path in apiPaths) {
      var apiEndpoint = apiPaths[path];

      for (var httpMethod in apiEndpoint) {
        if (!supportedHttpMethods.includes(httpMethod)) continue;

        var apiMethod = apiEndpoint[httpMethod];
        var dynamicComponent = {};

        var dynamicComponentType = this.getDynamicComponentType(
          httpMethod,
          apiMethod,
          path
        );
        switch (dynamicComponentType) {
          case FORM:
            dynamicComponent = DynamicFormFactory.createDynamicForm(
              path,
              httpMethod,
              apiMethod,
              apiModels
            );
            break;
          case SEARCH_FORM:
            dynamicComponent = DynamicSearchFormFactory.createDynamicSearchForm(
              path,
              httpMethod,
              apiMethod
            );
            break;
        }
        dynamicComponents.push(dynamicComponent);
      }
      if (apiEndpoint.parameters) {
        var controlsForEndpointParameters = ControlFactory.createControlsForEndpointParameters(
          apiEndpoint.parameters
        );

        dynamicComponents.forEach((component) => {
          if (!component.controls) component.controls = [];
          if (controlsForEndpointParameters.length > 0) {
            controlsForEndpointParameters.forEach((control) => {
              component.controls.push(control);
            });
          }
        });
      }
    }
    return dynamicComponents;
  }
  static getDynamicComponentType(httpMethod, apiMethod) {
    if (httpMethod === 'get') {
      var responseOk = apiMethod.responses['200'];
      if (responseOk) {
        if (responseOk.content || responseOk.schema) {
          return SEARCH_FORM;
        } else {
          return FORM;
        }
      } else {
        return FORM;
      }
    } else if (
      httpMethod === 'post' ||
      httpMethod === 'delete' ||
      httpMethod === 'put'
    ) {
      return FORM;
    } else {
      throw new Error(`${httpMethod} - not supported HTTP method.`);
    }
  }
}
