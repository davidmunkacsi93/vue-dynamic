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
        console.log(reason);
      });
  }

  processOpenApi2(parsedSpecification) {
    console.log("Parsing swagger specificaiton version 2.0");
  }

  processOpenApi3(parsedSpecification) {
    console.log("Parsing swagger specificaiton version 3.0.0");
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
