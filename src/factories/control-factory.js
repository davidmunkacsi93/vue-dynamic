import {
  DROP_DOWN,
  SWITCH,
  NUMBER_INPUT,
  FLOAT_INPUT,
  TEXT_INPUT,
  DATE_PICKER,
  PASSWORD_INPUT,
  CHIPS
} from '../types/layout-item-types';
import { getLastURLSegment } from '../utils/helpers';

class ControlFactory {
  createControlsForEndpointParameters(parameters) {
    var controls = [];
    parameters.forEach((parameter) => {
      var controlForParameter = this.createControl(parameter);
      controls.push(controlForParameter);
    });

    return controls;
  }

  createControlsForParameters(apiMethod, apiModels) {
    var controls = [];

    for (var parameter of apiMethod.parameters) {
      var control;
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
        control = {
          label: parameter.name,
          in: parameter.in,
          required: parameter.required,
          ...controlForSchema
        };
      } else {
        var controlForParameter = this.createControl(parameter);
        control = {
          label: parameter.name,
          in: parameter.in,
          required: parameter.required,
          ...controlForParameter
        };
      }
      controls.push(control);
    }

    return controls;
  }

  createControlsForSchema(parameterIn, schema, apiModels) {
    var controls = [];
    var apiModelKey = getLastURLSegment(schema.$ref);

    var apiModelForSchema = apiModels.find(
      (model) => model.type === apiModelKey
    );
    var requiredProperties = apiModelForSchema.required;
    for (var property of apiModelForSchema.properties) {
      var controlForSchema = this.createControl(property);
      var control = {
        label: property.name,
        in: parameterIn,
        required:
          requiredProperties &&
          requiredProperties.some((prop) => prop === property.name),
        ...controlForSchema
      };
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

    switch (parameter.type) {
      case 'integer':
        control.element = NUMBER_INPUT;
        break;
      case 'number':
        control.element = FLOAT_INPUT;
        break;
      case 'string':
        if (parameter.format) {
          switch (parameter.format) {
            case 'date':
            case 'date-time':
              control.element = DATE_PICKER;
              break;
            case 'password':
              control.element = PASSWORD_INPUT;
              break;
            default:
              control.element = TEXT_INPUT;
              break;
          }
        } else {
          control.element = TEXT_INPUT;
        }
        break;
      case 'boolean':
        control.element = SWITCH;
        break;
      case 'array':
        if (parameter.items) {
          if (parameter.items.enum) {
            let dropDown = this.createDropDown(parameter.items);
            control = { ...control, ...dropDown };
          } else if (parameter.items.type === 'string') {
            control.element = CHIPS;
            control.value = [];
          } else if (parameter.items.$ref) {
            // TODO: Create a list of objects?
          }
        } else if (parameter.arrayType) {
          if (parameter.arrayType === 'string') {
            control.element = CHIPS;
            control.value = [];
          }
        } else if (parameter.schema) {
          // TODO: Create a list of objects?
        }
        break;
      case 'object':
        console.log(parameter);
        break;
      default:
        break;
    }

    if (parameter.enum) {
      let dropDown = this.createDropDown(parameter);
      control = {
        ...control,
        ...dropDown
      };
    }
    return control;
  }

  createDropDown(parameter) {
    var control = {};
    if (parameter.enum.every((value) => value === true || value === false)) {
      control.element = SWITCH;
    } else {
      control.element = DROP_DOWN;
      control.values = parameter.enum;
    }
    control.description = parameter.description;
    control.default = parameter.default;

    return control;
  }
}

const instance = new ControlFactory();
Object.freeze(instance);
export default instance;
