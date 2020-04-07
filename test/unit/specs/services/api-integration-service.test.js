import SwaggerParser from 'swagger-parser';
import OpenApiParser from '../../../../src/parsers/open-api-parser.js';
import ApiIntegrationService from '../../../../src/services/api-integration-service';

describe('Tests for api-integration-service integrateNewApi function:', () => {
  it('must throw an error, when swagger validation fails.', async () => {
    spyOn(SwaggerParser, 'validate').and.callFake(() => {
      throw new Error('Validation failed');
    });

    ApiIntegrationService.integrateNewAPI('URL').catch((reason) => {
      expect(reason.message).toBe('Validation failed');
    });
  });

  it('must throw an error, when OpenAPI parser throws an error.', async () => {
    const swagger = { swagger: '2.0.' };
    spyOn(SwaggerParser, 'validate').and.returnValue(Promise.resolve(swagger));
    spyOn(OpenApiParser, 'processSpecification').and.throwError(
      'Parsing failed'
    );

    const result = await ApiIntegrationService.integrateNewAPI('URL').catch(
      (reason) => {
        expect(reason.message).toEqual('Error: Parsing failed');
      }
    );
  });

  it('must throw an error, when OpenAPI parser throws an error.', async () => {
    const swagger = { swagger: '2.0.' };
    spyOn(SwaggerParser, 'validate').and.returnValue(Promise.resolve(swagger));

    var uiModel = {
      specificationVersion: '2.0'
    };
    spyOn(OpenApiParser, 'processSpecification').and.returnValue(uiModel);

    const result = await ApiIntegrationService.integrateNewAPI('URL');
    expect(result).toEqual(uiModel);
  });
});
