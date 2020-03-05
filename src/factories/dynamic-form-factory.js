import { FORM, INPUT, DROP_DOWN, SWITCH } from "../types/layout-item-types";
import { getLastURLSegment } from "../utils/helpers";

class DynamicFormFactory {
  createDynamicForm(path, httpMethod, apiMethod, apiModels) {
    var dynamicComponent = {};
    dynamicComponent.path = path;
    dynamicComponent.description = apiMethod.description;
    dynamicComponent.httpMethod = httpMethod.toUpperCase();
    dynamicComponent.type = FORM;
    if (apiMethod.parameters) {
      dynamicComponent.controls = this.createControlsForParameters(
        apiMethod,
        apiModels
      );
    } else if (apiMethod.requestBody) {
      var schema = apiMethod.requestBody.content["application/json"].schema;
      dynamicComponent.controls = this.createControlsForSchema(
        schema,
        apiModels
      );
    } else {
      console.error(
        `Can't generate dynamic component for endpoint ${apiMethod.description}`
      );
    }
    return dynamicComponent;
  }

  createControlsForParameters(apiMethod, apiModels) {
    var controls = [];
    for (var parameter of apiMethod.parameters) {
      var control = {
        label: parameter.name,
        element: INPUT,
        in: parameter.in,
        type: parameter.schema.type,
        format: parameter.schema.format,
        placeholder: parameter.schema.example,
        value: null
      };
      if (parameter.schema) {
        if (parameter.schema.$ref) {
          controls = this.createControlsForSchema(parameter.schema, apiModels);
        }
        if (parameter.schema.enum) {
          if (
            parameter.schema.enum.every(
              value => value === true || value === false
            )
          ) {
            control.element = SWITCH;
          } else {
            control.element = DROP_DOWN;
            control.values = parameter.schema.enum;
          }
        }
      }
      controls.push(control);
    }
    return controls;
  }

  createControlsForSchema(schema, apiModels) {
    var controls = [];
    var apiModelKey = getLastURLSegment(schema.$ref);

    var apiModelForSchema = apiModels.find(model => model.type === apiModelKey);
    debugger;
    for (var property of apiModelForSchema.properties) {
      var control = {
        label: property.name,
        element: INPUT,
        in: property.in,
        type: property.type,
        format: property.format,
        placeholder: property.example,
        isEnum: false
      };
      controls.push(control);
    }
    return controls;
  }
}

const instance = new DynamicFormFactory();
Object.freeze(instance);
export default instance;
