import {
  FORM,
  DROP_DOWN,
  SWITCH,
  NUMBER_INPUT,
  FLOAT_INPUT,
  TEXT_INPUT,
  LIST,
  DATE_PICKER,
  PASSWORD_INPUT
} from "../types/layout-item-types";
import { getLastURLSegment } from "../utils/helpers";

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
    if (apiMethod.parameters) {
      dynamicComponent.controls = this.createControlsForParameters(
        apiMethod,
        apiModels
      );
    } else if (apiMethod.requestBody) {
      var schema = apiMethod.requestBody.content["application/json"].schema;
      dynamicComponent.controls = this.createControlsForSchema(
        "body",
        schema,
        apiModels
      );
    } else {
      console.error(
        `Can't generate dynamic component for endpoint ${apiMethod.description}`
      );
    }
    dynamicComponent.responses = apiMethod.responses;

    return dynamicComponent;
  }

  createControlsForParameters(apiMethod, apiModels) {
    var controls = [];

    for (var parameter of apiMethod.parameters) {
      if (parameter.schema) {
        if (parameter.schema.$ref) {
          controls = this.createControlsForSchema(
            parameter.in,
            parameter.schema,
            apiModels
          );
          return controls;
        }
        var controlForSchema = this.createControl(parameter.schema);
        var control = {
          label: parameter.name,
          in: parameter.in,
          required: parameter.required,
          ...controlForSchema
        };
        controls.push(control);
        console.log(control);
      }
    }

    return controls;
  }

  createControlsForSchema(parameterIn, schema, apiModels) {
    var controls = [];
    var apiModelKey = getLastURLSegment(schema.$ref);

    var apiModelForSchema = apiModels.find(model => model.type === apiModelKey);
    var requiredProperties = apiModelForSchema.required;
    for (var property of apiModelForSchema.properties) {
      var controlForSchema = this.createControl(property);
      var control = {
        label: property.name,
        in: parameterIn,
        required:
          requiredProperties &&
          requiredProperties.some(prop => prop === property),
        ...controlForSchema
      };
      console.log(control);
      controls.push(control);
    }
    return controls;
  }

  createControl(parameter) {
    var control = {
      type: parameter.type,
      format: parameter.format,
      minimum: parameter.minimum,
      maximum: parameter.maximum,
      default: null,
      value: null
    };

    console.log(parameter);
    console.log(parameter.type);
    switch (parameter.type) {
      case "integer":
        control.element = NUMBER_INPUT;
        break;
      case "number":
        control.element = FLOAT_INPUT;
        break;
      case "string":
        switch (parameter.format) {
          case "date":
          case "date-time":
            control.element = DATE_PICKER;
            break;
          case "password":
            control.element = PASSWORD_INPUT;
            break;
          default:
            control.element = TEXT_INPUT;
            break;
        }
        break;
      case "boolean":
        control.element = SWITCH;
        break;
      case "array":
        control.element = LIST;
        // TODO: How to display this?
        break;
      default:
    }

    if (parameter.enum) {
      if (parameter.enum.every(value => value === true || value === false)) {
        control.element = SWITCH;
      } else {
        control.element = DROP_DOWN;
        control.values = parameter.enum;
      }
      control.description = parameter.description;
      control.default = parameter.default;
    }
    return control;
  }
}

const instance = new DynamicFormFactory();
Object.freeze(instance);
export default instance;
