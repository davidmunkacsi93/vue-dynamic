import SwaggerParser from "swagger-parser";

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
    var version = {
      specificationVersion: specification.openapi
    };
    var metadata = this.extractMetadata(specification.info);
    var apiModels = this.createApiModelsFromSchemaObjectss(
      specification.components.schemas
    );
    var apiModel = {
      ...version,
      ...metadata,
      ...apiModels
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
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
