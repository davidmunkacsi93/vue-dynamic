import DynamicComponentFactory from '../../src/factories/dynamic-component-factory';
import { FORM, SEARCH_FORM } from '../../src/types/layout-item-types';
import DynamicSearchFormFactory from '../../src/factories/dynamic-search-form-factory';
import DynamicFormFactory from '../../src/factories/dynamic-form-factory';

describe('Test for createDynamicComponents: ', () => {
  it('empty array when no paths are defined.', () => {
    var apiPaths = {};
    var apiModels = [];

    var result = DynamicComponentFactory.createDynamicComponents(
      apiPaths,
      apiModels
    );
    expect(result).toEqual([]);
  });

  it('throws an error, when getDynamicComponentyType throws an error.', () => {
    var apiPaths = {
      '/segment1/segment2': {
        get: {
          parameters: {}
        }
      }
    };
    var apiModels = [];

    spyOn(DynamicComponentFactory, 'getDynamicComponentType').and.throwError();

    expect(() =>
      DynamicComponentFactory.createDynamicComponents(apiPaths, apiModels)
    ).toThrowError();
  });

  it('throws error, when createDynamicForm throws error.', () => {
    var apiPaths = {
      '/segment1/segment2': {
        get: {
          parameters: {}
        }
      }
    };
    var apiModels = [];

    spyOn(DynamicComponentFactory, 'getDynamicComponentType').and.returnValue(
      FORM
    );

    spyOn(DynamicFormFactory, 'createDynamicForm').and.throwError();

    expect(() =>
      DynamicComponentFactory.createDynamicComponents(apiPaths, apiModels)
    ).toThrowError();
  });

  it('throws error, when createDynamicSearchForm throws error.', () => {
    var apiPaths = {
      '/segment1/segment2': {
        get: {
          parameters: {}
        }
      }
    };
    var apiModels = [];

    spyOn(DynamicComponentFactory, 'getDynamicComponentType').and.returnValue(
      SEARCH_FORM
    );

    spyOn(DynamicSearchFormFactory, 'createDynamicSearchForm').and.throwError();

    expect(() =>
      DynamicComponentFactory.createDynamicComponents(apiPaths, apiModels)
    ).toThrowError();
  });
});

describe('Test for getDynamicComponentType factory logic:', () => {
  it('get method with specified response should be a search form.', () => {
    var httpMethod = 'get';
    var apiMethod = {
      responses: {
        '200': {
          content: {
            schema: {
              type: 'array'
            }
          }
        }
      }
    };

    var result = DynamicComponentFactory.getDynamicComponentType(
      httpMethod,
      apiMethod
    );
    expect(result).toBe(SEARCH_FORM);
  });

  it('get method and with schema should be a search form.', () => {
    var httpMethod = 'get';
    var apiMethod = {
      responses: {
        '200': {
          description: 'OK',
          schema: {
            $ref: '#definitions/Pet'
          }
        }
      }
    };

    var result = DynamicComponentFactory.getDynamicComponentType(
      httpMethod,
      apiMethod
    );
    expect(result).toBe(SEARCH_FORM);
  });

  it('get method and with unspecified content should be a form.', () => {
    var httpMethod = 'get';
    var apiMethod = {
      responses: {
        '200': {
          description: 'OK'
        }
      }
    };

    var result = DynamicComponentFactory.getDynamicComponentType(
      httpMethod,
      apiMethod
    );
    expect(result).toBe(FORM);
  });

  it('get method and with unspecified OK status should be a form.', () => {
    var httpMethod = 'get';
    var apiMethod = {
      responses: {
        '201': {
          description: 'created'
        }
      }
    };

    expect(() => {
      DynamicComponentFactory.getDynamicComponentType(
        httpMethod,
        apiMethod
      ).toBe(FORM);
    });
  });

  it('post, put, delete methods should be forms.', () => {
    var httpMethods = ['post', 'put', 'delete'];
    var apiMethod = {};

    httpMethods.forEach((httpMethod) => {
      var result = DynamicComponentFactory.getDynamicComponentType(
        httpMethod,
        apiMethod
      );
      expect(result).toBe(FORM);
    });
  });

  it('patch should throw an error', () => {
    var httpMethod = 'patch';
    var apiMethod = {};

    expect(() => {
      DynamicComponentFactory.getDynamicComponentType(httpMethod, apiMethod);
    }).toThrowError('patch - not supported HTTP method.');
  });
});
