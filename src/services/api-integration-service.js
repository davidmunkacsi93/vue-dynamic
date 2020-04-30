import SwaggerParser from 'swagger-parser';
import OpenApiProcessor from '../processors/open-api-processor.js';

const MAXIMUM_TIMEOUT = 10000;

class ApiIntegrationService {
  async integrateNewAPI(url) {
    const timeOut = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timed out')), MAXIMUM_TIMEOUT)
    );

    return Promise.race([
      SwaggerParser.validate(url, {
        dereference: {
          circular: false
        }
      }),
      timeOut
    ])
      .then(async (parsedSpecification) => {
        return OpenApiProcessor.processSpecification(parsedSpecification);
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
}

const instance = new ApiIntegrationService();
Object.freeze(instance);

export default instance;
