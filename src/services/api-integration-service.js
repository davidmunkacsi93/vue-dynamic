import SwaggerParser from 'swagger-parser';
import OpenApiParser from '../parsers/open-api-parser.js';

class ApiIntegrationService {
  async integrateNewAPI(url) {
    return SwaggerParser.validate(url)
      .then(async (parsedSpecification) => {
        console.log(parsedSpecification);
        return OpenApiParser.processSpecification(parsedSpecification);
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
