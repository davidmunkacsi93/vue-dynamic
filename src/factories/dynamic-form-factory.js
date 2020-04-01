import { FORM } from '../types/layout-item-types';

import ControlFactory from './control-factory';

class DynamicFormFactory {
  createDynamicForm(path, httpMethod, apiMethod, apiModels) {
    var dynamicComponent = {};
    dynamicComponent.path = path;

    if (apiMethod.description) {
      dynamicComponent.description = apiMethod.description;
    }
    if (apiMethod.summary) {
      dynamicComponent.description = apiMethod.summary;
    }

    dynamicComponent.httpMethod = httpMethod.toUpperCase();
    dynamicComponent.type = FORM;

    dynamicComponent.tags = apiMethod.tags;

    if (apiMethod.parameters) {
      dynamicComponent.controls = ControlFactory.createControlsForParameters(
        apiMethod,
        apiModels
      );
    } else if (apiMethod.requestBody) {
      var schema = apiMethod.requestBody.content['application/json'].schema;
      dynamicComponent.controls = ControlFactory.createControlsForSchema(
        'body',
        schema,
        apiModels
      );
    } else {
      throw new Error(
        `Can't generate dynamic component for endpoint ${apiMethod.description}`
      );
    }
    dynamicComponent.responses = apiMethod.responses;

    return dynamicComponent;
  }
}

const instance = new DynamicFormFactory();
Object.freeze(instance);
export default instance;
