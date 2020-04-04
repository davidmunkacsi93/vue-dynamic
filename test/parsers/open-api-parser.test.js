import ApiModelFactory from '../../src/factories/api-model-factory';
import DynamicComponentFactory from '../../src/factories/dynamic-component-factory';
import OpenApiParser from '../../src/parsers/open-api-parser.js';
import OpenApiInformationProvider from '../../src/providers/open-api-information-provider.js';

describe('Tests for OpenApiParser processSpecification: ', () => {
  it('throws error, when specification cannot be determined', () => {
    expect(() => OpenApiParser.processSpecification()).toThrowError();
  });

  it('throws error, when provider throws error.', () => {
    spyOn(OpenApiInformationProvider, 'getApiInformation').and.throwError();

    var specification = {
      openApi: '3.0'
    };
    expect(() =>
      OpenApiParser.processSpecification(specification)
    ).toThrowError();
  });

  it('throws error, when provider throws error.', () => {
    var apiInformation = {
      apiVersion: '3.0',
      title: 'API',
      description: 'Description'
    };
    spyOn(OpenApiInformationProvider, 'getApiInformation').and.returnValue(
      apiInformation
    );

    spyOn(OpenApiInformationProvider, 'getServerInformation').and.throwError();

    var specification = {
      openApi: '3.0',
      info: {}
    };
    expect(() =>
      OpenApiParser.processSpecification(specification)
    ).toThrowError();
  });

  it('throws error, when api model factory throws error.', () => {
    var apiInformation = {
      apiVersion: '3.0',
      title: 'API',
      description: 'Description'
    };
    spyOn(OpenApiInformationProvider, 'getApiInformation').and.returnValue(
      apiInformation
    );

    var serverInformation = {
      serverURL: 'https://virtserver.com',
      serverDescription: 'Description'
    };
    spyOn(OpenApiInformationProvider, 'getServerInformation').and.returnValue(
      serverInformation
    );

    spyOn(ApiModelFactory, 'createApiModels').and.throwError();

    var specification = {
      openApi: '3.0',
      info: {}
    };
    expect(() =>
      OpenApiParser.processSpecification(specification)
    ).toThrowError();
  });

  it('throws error, when dynamic component factory throws error.', () => {
    var apiInformation = {
      apiVersion: '3.0',
      title: 'API',
      description: 'Description'
    };
    spyOn(OpenApiInformationProvider, 'getApiInformation').and.returnValue(
      apiInformation
    );

    var serverInformation = {
      serverURL: 'https://virtserver.com',
      serverDescription: 'Description'
    };
    spyOn(OpenApiInformationProvider, 'getServerInformation').and.returnValue(
      serverInformation
    );

    var apiModels = [{ model: {} }];
    spyOn(ApiModelFactory, 'createApiModels').and.returnValue(apiModels);

    var specification = {
      openApi: '3.0',
      info: {}
    };
    expect(() =>
      OpenApiParser.processSpecification(specification)
    ).toThrowError();
  });
});
