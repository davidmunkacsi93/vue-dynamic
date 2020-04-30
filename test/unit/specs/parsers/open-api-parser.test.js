import DynamicComponentFactory from '../../../../src/factories/dynamic-component-factory';
import OpenApiProcessor from '../../../../src/processors/open-api-processorjs';
import OpenApiInformationProvider from '../../../../src/providers/open-api-information-provider.js';

describe('Tests for OpenApiProcessor processSpecification: ', () => {
  it('throws error, when specification cannot be determined', () => {
    expect(() => OpenApiProcessor.processSpecification()).toThrowError();
  });

  it('throws error, when provider throws error.', () => {
    spyOn(OpenApiInformationProvider, 'getApiInformation').and.throwError();

    var specification = {
      openApi: '3.0'
    };
    expect(() =>
      OpenApiProcessor.processSpecification(specification)
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
      OpenApiProcessor.processSpecification(specification)
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

    spyOn(DynamicComponentFactory, 'createDynamicComponents').and.throwError();

    var specification = {
      openApi: '3.0',
      info: {},
      components: {
        schemas: {}
      }
    };
    expect(() =>
      OpenApiProcessor.processSpecification(specification)
    ).toThrowError();
  });

  it('creates valid dynamic components.', () => {
    var apiInformation = {
      apiVersion: '3.0'
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

    var dynamicComponents = [{ component: {} }];
    spyOn(DynamicComponentFactory, 'createDynamicComponents').and.returnValue(
      dynamicComponents
    );

    var specification = {
      openApi: '3.0',
      info: {},
      components: {
        schemas: {}
      }
    };
    var result = OpenApiProcessor.processSpecification(specification);
    expect(result.apiVersion).toBe(apiInformation.apiVersion);
    expect(result.title).toBe(apiInformation.title);
    expect(result.description).toBe(apiInformation.description);
    expect(result.serverURL).toBe(serverInformation.serverURL);
    expect(result.serverDescription).toBe(serverInformation.serverDescription);
    expect(result.dynamicComponents).toBe(dynamicComponents);
    expect(result.compacted).toBe(false);
  });
});
