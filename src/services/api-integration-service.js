import SwaggerParser from "swagger-parser";

class ApiIntegrationService {
  async getSwaggerSpecification(url) {
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
    var uiModel = {
      apiVersion: specification.info.version,
      title: specification.info.title,
      description: specification.info.description,
      specificationVersion: specification.swagger
    };
    console.log(uiModel);
  }

  processOpenApi3(specification) {
    var uiModel = {
      apiVersion: specification.info.version,
      title: specification.info.title,
      description: specification.info.description,
      specificationVersion: specification.openapi
    };
    console.log(uiModel);
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
