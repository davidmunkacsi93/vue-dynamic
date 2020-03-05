import SwaggerParser from "swagger-parser";
import OpenApi2Parser from "./open-api-2-parser.js";
import OpenApi3Parser from "./open-api-3-parser.js";

class ApiIntegrationService {
  async integrateNewAPI(url) {
    return SwaggerParser.validate(url)
      .then(async () => {
        let parsedSpecification = await SwaggerParser.parse(url);
        if (parsedSpecification.swagger === "2.0") {
          return OpenApi2Parser.processSpecification(parsedSpecification);
        } else if (parsedSpecification.openapi === "3.0.0") {
          return OpenApi3Parser.processSpecification(parsedSpecification);
        } else {
          console.error("Unknown specification or version detected.");
        }
      })
      .catch(reason => {
        console.error(reason);
      });
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
