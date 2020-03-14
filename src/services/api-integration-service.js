import SwaggerParser from "swagger-parser";
import OpenApi2Parser from "../parsers/open-api-2-parser.js";
import OpenApi3Parser from "../parsers/open-api-3-parser.js";

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
          throw new Error("Unknown specification or version detected.");
        }
      })
      .catch(reason => {
        console.error(reason);
        throw new Error(reason);
      });
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
