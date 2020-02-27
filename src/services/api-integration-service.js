import SwaggerParser from "swagger-parser";
import { FORM } from "../types/layout-item-types";
import { HTTP_POST } from "../types/http-methods";

class ApiIntegrationService {
  async integrateNewAPI(url) {
    return SwaggerParser.validate(url)
      .then(async () => {
        let parsedSpecification = await SwaggerParser.parse(url);
        if (parsedSpecification.swagger === "2.0") {
          return this.processOpenApi2(parsedSpecification);
        } else if (parsedSpecification.openapi === "3.0.0") {
          return this.processOpenApi3(parsedSpecification);
        } else {
          console.error("Unknown specification or version detected.");
        }
      })
      .catch(reason => {
        console.error(reason);
      });
  }

  processOpenApi2(specification) {
    console.log(specification);
    var version = {
      specificationVersion: specification.openapi
    };
    var metadata = this.extractMetadata(specification.info);
    var apiModel = {
      ...version,
      ...metadata
    };
    return apiModel;
  }

  processOpenApi3(specification) {
    console.log(specification);
    var version = {
      specificationVersion: specification.openapi
    };
    var metadata = this.extractMetadata(specification.info);
    var serverMetadata = this.extractServerMetadataV3(specification.servers);
    var apiModels = this.createApiModelsFromSchemaObjectss(
      specification.components.schemas
    );
    var dynamicComponents = this.createDynamicComponentsForApi(
      specification.paths,
      apiModels
    );

    var apiModel = {
      ...version,
      ...serverMetadata,
      ...metadata,
      ...apiModels,
      ...dynamicComponents
    };
    return apiModel;
  }

  extractMetadata(info) {
    return {
      apiVersion: info.version,
      title: info.title,
      description: info.description
    };
  }

  extractServerMetadataV3(servers) {
    return {
      serverDescription: servers[0].description,
      serverURL: servers[0].url
    };
  }

  createApiModelsFromSchemaObjectss(schemaObjects) {
    var result = {
      apiModels: []
    };
    if (!schemaObjects) return;

    for (var objectKey in schemaObjects) {
      const schemaObject = schemaObjects[objectKey];

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
          type: propertyObject.type
        };

        if (propertyObject.type === "array") {
          property.arrayType = propertyObject.items.$ref.replace(
            "#/components/schemas/",
            ""
          );
        }
        apiModel.properties.push(property);
      }
      result.apiModels.push(apiModel);
    }
    return result;
  }

  createDynamicComponentsForApi(apiEndpoints, apiModels) {
    var result = {
      dynamicComponents: []
    };
    for (var endpoint in apiEndpoints) {
      var apiEndpoint = apiEndpoints[endpoint];
      for (var httpMethod in apiEndpoint) {
        var apiMethod = apiEndpoint[httpMethod];

        var dynamicComponent = this.getNewDynamicComponent();
        if (httpMethod === "get") {
          // Based on the parameters specified generate a search form,
          // that transform into a grid / list / input based on the response type.
        } else if (httpMethod === "post") {
          dynamicComponent.description = apiMethod.description;
          dynamicComponent.httpMethod = HTTP_POST;
          dynamicComponent.path = endpoint;
          dynamicComponent.type = FORM;

          // Generate dynamic form.
        } else if (httpMethod === "delete") {
          // Generate dynamic form.
        } else if (httpMethod === "put") {
          // Generate dynamic form for the parameters.
        } else {
          console.log(httpMethod);
          console.error("Not supported HTTP method.");
        }

        result.dynamicComponents.push(dynamicComponent);
      }
    }
    console.log(apiModels);
    console.log(result);
  }

  getNewDynamicComponent() {
    return {
      description: null,
      httpMethod: null,
      path: null,
      type: null
    };
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
