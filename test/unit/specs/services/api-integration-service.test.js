import SwaggerParser from 'swagger-parser';
import OpenApiProcessor from '../../../../src/processors/open-api-processor.js';
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

  it('must throw an error, when OpenAPI processor throws an error.', async () => {
    const swagger = { swagger: '2.0.' };
    spyOn(SwaggerParser, 'validate').and.returnValue(Promise.resolve(swagger));
    spyOn(OpenApiProcessor, 'processSpecification').and.throwError(
      'Parsing failed'
    );

    const result = await ApiIntegrationService.integrateNewAPI('URL').catch(
      (reason) => {
        expect(reason.message).toEqual('Error: Parsing failed');
      }
    );
  });

  it('must throw an error, when OpenAPI processor throws an error.', async () => {
    const swagger = { swagger: '2.0.' };
    spyOn(SwaggerParser, 'validate').and.returnValue(Promise.resolve(swagger));

    var uiModel = {
      specificationVersion: '2.0'
    };
    spyOn(OpenApiProcessor, 'processSpecification').and.returnValue(uiModel);

    const result = await ApiIntegrationService.integrateNewAPI('URL');
    expect(result).toEqual(uiModel);
  });
});
