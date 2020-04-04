import SwaggerParser from 'swagger-parser';
import OpenApiParser from '../../src/parsers/open-api-parser.js';
import ApiIntegrationService from '../../src/services/api-integration-service';

describe('Tests for api-integration-service integrateNewApi function:', () => {
  it('must throw an error, when swagger validation fails.', async () => {
    spyOn(SwaggerParser, 'validate').and.callFake(() => {
      throw new Error('Validation failed');
    });

    ApiIntegrationService.integrateNewAPI('URL').catch((reason) => {
      expect(reason.message).toBe(validation('Validation failed'));
    });
  });
});
