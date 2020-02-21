import SwaggerParser from "swagger-parser";

class ApiIntegrationService {
  async integrateNewAPI(url) {
    SwaggerParser.validate(url)
      .then(async () => {
        let parsedSpecification = await SwaggerParser.parse(url);
        if (parsedSpecification.swagger === "2.0") {
          this.processOpenApi2(parsedSpecification);
        } else if (parsedSpecification.openapi === "3.0.0") {
          this.processOpenApi3(parsedSpecification);
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

    var uiModel = {
      specificationVersion: specification.swagger
    };
    this.extractMetadata(uiModel, specification.info);
    return uiModel;
  }

  processOpenApi3(specification) {
    console.log(specification);
    var version = {
      specificationVersion: specification.openapi
    };
    var metadata = this.extractMetadata(specification.info);
    var apiModels = this.createApiModelsFromSchemaObjectss(
      specification.components.schemas
    );
    console.log(apiModels);
    var uiModel = {
      ...version,
      ...metadata,
      ...apiModels
    };
    console.log(uiModel);
    return uiModel;
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
