import ApiModelFactory from '../../../../src/factories/api-model-factory';
import DynamicComponentFactory from '../../../../src/factories/dynamic-component-factory';
import OpenApiParser from '../../../../src/parsers/open-api-parser.js';
import OpenApiInformationProvider from '../../../../src/providers/open-api-information-provider.js';
import DefaultApiLayoutFactory from '../../../../src/factories/default-api-layout-factory';

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

    spyOn(DynamicComponentFactory, 'createDynamicComponents').and.throwError();

    var specification = {
      openApi: '3.0',
      info: {},
      components: {
        schemas: {}
      }
    };
    expect(() =>
      OpenApiParser.processSpecification(specification)
    ).toThrowError();
  });

  it('throws error, when default api layout factory throws error.', () => {
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

    var dynamicComponents = [{ component: {} }];
    spyOn(DynamicComponentFactory, 'createDynamicComponents').and.returnValue(
      dynamicComponents
    );

    spyOn(DefaultApiLayoutFactory, 'getDefaultApiLayout').and.throwError();

    var specification = {
      openApi: '3.0',
      info: {},
      components: {
        schemas: {}
      }
    };
    expect(() =>
      OpenApiParser.processSpecification(specification)
    ).toThrowError();
  });

  it('throws error, when default api layout factory throws error.', () => {
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

    var apiModels = [{ model: {} }];
    spyOn(ApiModelFactory, 'createApiModels').and.returnValue(apiModels);

    var dynamicComponents = [{ component: {} }];
    spyOn(DynamicComponentFactory, 'createDynamicComponents').and.returnValue(
      dynamicComponents
    );

    var defaultLayout = [
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ];
    spyOn(DefaultApiLayoutFactory, 'getDefaultApiLayout').and.returnValue(
      defaultLayout
    );

    var specification = {
      openApi: '3.0',
      info: {},
      components: {
        schemas: {}
      }
    };
    var result = OpenApiParser.processSpecification(specification);
    expect(result.apiVersion).toBe(apiInformation.apiVersion);
    expect(result.title).toBe(apiInformation.title);
    expect(result.description).toBe(apiInformation.description);
    expect(result.serverURL).toBe(serverInformation.serverURL);
    expect(result.serverDescription).toBe(serverInformation.serverDescription);
    expect(result.apiModels).toBe(apiModels);
    expect(result.dynamicComponents).toBe(dynamicComponents);
    Object.keys(result.apiLayouts).forEach((screenClass) =>
      expect(result.apiLayouts[screenClass]).toBe(defaultLayout)
    );
    expect(result.compacted).toBe(false);
  });
});
