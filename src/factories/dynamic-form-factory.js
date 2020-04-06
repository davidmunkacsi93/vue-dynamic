import { FORM } from '../types/layout-item-types';

import ControlFactory from './control-factory';

export default class DynamicFormFactory {
  static createDynamicForm(path, httpMethod, apiMethod, schemas) {
    var dynamicComponent = {};
    var controls = [];
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
      controls = ControlFactory.createControlsForParameters(apiMethod, schemas);
    } else if (apiMethod.requestBody) {
      var schema = apiMethod.requestBody.content['application/json'].schema;
      controls = ControlFactory.createControlsForSchema(
        'body',
        schema,
        schemas
      );
    } else {
      throw new Error(
        `Can't generate dynamic component for endpoint ${apiMethod.description}`
      );
    }

    if (controls.length > 0) {
      dynamicComponent.controls = controls;
    }

    dynamicComponent.responses = apiMethod.responses;

    return dynamicComponent;
  }
}
