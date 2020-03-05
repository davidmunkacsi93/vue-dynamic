import { FORM, INPUT, DROP_DOWN, SWITCH } from "../types/layout-item-types";

class OpenApi3Parser {
  processSpecification(specification) {
    var version = specification.openapi;

    var apiInformation = this.getApiInformation(specification.info);
    var serverInformation = this.getServerInformation(specification.servers);

    var apiModels = this.createApiModels(specification.components.schemas);
    var dynamicComponents = this.createDynamicComponentsForApi(
      specification.paths,
      apiModels
    );

    var apiUIModel = {
      version,
      ...apiInformation,
      ...serverInformation,
      apiModels,
      dynamicComponents,
      apiLayout: []
    };

    return apiUIModel;
  }

  getApiInformation(info) {
    return {
      apiVersion: info.version,
      title: info.title,
      description: info.description
    };
  }

  getServerInformation(servers) {
    return {
      serverDescription: servers[0].description,
      serverURL: servers[0].url
    };
  }

  createApiModels(schemas) {
    var apiModels = [];
    if (!schemas) return;

    for (var objectKey in schemas) {
      const schemaObject = schemas[objectKey];

      if (!schemaObject) continue;

      var apiModel = {
        type: objectKey,
        description: schemaObject.description,
        properties: []
      };

      for (var propertyName in schemaObject.properties) {
        var propertyObject = schemaObject.properties[propertyName];
        if (!propertyObject) continue;

        var property = {
          name: propertyName,
          type: propertyObject.type,
          format: propertyObject.format,
          placeholder: propertyObject.example,
          isEnum: false
        };

        if (propertyObject.enum) {
          property.isEnum = true;
          property.enumValues = propertyObject.enum;
        }

        if (propertyObject.type === "array") {
          if (propertyObject.items.$ref) {
            property.arrayType = propertyObject.items.$ref.replace(
              "#/components/schemas/",
              ""
            );
          } else {
            property.arrayType = propertyObject.items.type;
          }
        }
        apiModel.properties.push(property);
      }
      apiModels.push(apiModel);
    }
    return apiModels;
  }

  createDynamicComponentsForApi(apiEndpoints, apiModels) {
    var dynamicComponents = [];

    for (var endpoint in apiEndpoints) {
      var apiEndpoint = apiEndpoints[endpoint];

      for (var httpMethod in apiEndpoint) {
        var apiMethod = apiEndpoint[httpMethod];
        var dynamicComponent = {};
        dynamicComponent.path = endpoint;
        dynamicComponent.description = apiMethod.description;
        dynamicComponent.httpMethod = httpMethod.toUpperCase();

        if (httpMethod === "get") {
          // Based on the parameters specified generate a search form,
          // that transform into a grid / list / input based on the response type.
        } else if (
          httpMethod === "post" ||
          httpMethod === "delete" ||
          httpMethod === "put"
        ) {
          dynamicComponent.type = FORM;
          dynamicComponent.controls = this.createControlsForDynamicForm(
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

  createControlsForDynamicForm(apiMethod, apiModels) {
    var controls = [];
    if (apiMethod.parameters) {
      controls = this.createControlsForParameters(apiMethod, apiModels);
    } else if (apiMethod.requestBody) {
      controls = this.createControlsForSchema(apiMethod, apiModels);
    } else {
      console.error(
        `Can't generate dynamic component for endpoint ${apiMethod.description}`
      );
    }
    return controls;
  }

  createControlsForSchema(apiMethod, apiModels) {
    var controls = [];
    var schema = apiMethod.requestBody.content["application/json"].schema;
    var apiModelKey = schema.$ref.replace("#/components/schemas/", "");
    var apiModelForSchema = apiModels.find(model => model.type === apiModelKey);
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

  createControlsForParameters(apiMethod) {
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
      controls.push(control);
    }
    return controls;
  }
}

const instance = new OpenApi3Parser();
Object.freeze(instance);
export default instance;
