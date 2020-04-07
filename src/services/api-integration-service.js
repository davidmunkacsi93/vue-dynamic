import SwaggerParser from 'swagger-parser';
import OpenApiParser from '../parsers/open-api-parser.js';

class ApiIntegrationService {
  async integrateNewAPI(url) {
    const timeOut = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timed out')), 10000)
    );

    return Promise.race([SwaggerParser.validate(url), timeOut])
      .then(async (parsedSpecification) => {
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
