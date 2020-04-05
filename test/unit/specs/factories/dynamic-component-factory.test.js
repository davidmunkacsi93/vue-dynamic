import DynamicComponentFactory from '../../src/factories/dynamic-component-factory';
import {
  FORM,
  SEARCH_FORM,
  TEXT_INPUT,
  CHIPS
} from '../../src/types/layout-item-types';
import DynamicSearchFormFactory from '../../src/factories/dynamic-search-form-factory';
import DynamicFormFactory from '../../src/factories/dynamic-form-factory';
import ControlFactory from '../../src/factories/control-factory';

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

  it('throws an error, when createDynamicForm throws an error.', () => {
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

  it('throws an error, when createDynamicSearchForm throws an error.', () => {
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

  it('throws an error, when endpoint has parameters and ControlFactory throws an error.', () => {
    var apiPaths = {
      '/segment1/segment2': {
        get: {
          parameters: {
            schema: {
              name: 'id',
              type: 'int32'
            }
          }
        },
        parameters: [{ name: 'id' }]
      }
    };
    var apiModels = [];

    spyOn(DynamicComponentFactory, 'getDynamicComponentType').and.returnValue(
      SEARCH_FORM
    );

    var searchForm = {
      httpMethod: 'get',
      path: '/segment1/segment2',
      tags: 'tag',
      type: SEARCH_FORM,
      controls: []
    };
    spyOn(DynamicSearchFormFactory, 'createDynamicSearchForm').and.returnValue(
      searchForm
    );

    spyOn(
      ControlFactory,
      'createControlsForEndpointParameters'
    ).and.throwError();

    expect(() =>
      DynamicComponentFactory.createDynamicComponents(apiPaths, apiModels)
    ).toThrowError();
  });

  it('creates form and search form for endpoints', () => {
    var path = '/segment1/segment2';
    var getApiMethod = {
      parameters: {
        schema: {
          name: 'id',
          type: 'int32'
        }
      }
    };
    var postApiMethod = {
      parameters: {
        name: 'id'
      }
    };
    var apiPaths = {
      '/segment1/segment2': {
        get: getApiMethod,
        post: postApiMethod
      }
    };
    var apiModels = [];

    spyOn(DynamicComponentFactory, 'getDynamicComponentType')
      .withArgs('get', getApiMethod, path)
      .and.returnValue(SEARCH_FORM)
      .withArgs('post', postApiMethod, path)
      .and.returnValue(FORM);

    var searchForm = {
      httpMethod: 'get',
      path: '/segment1/segment2',
      tags: 'tag',
      type: SEARCH_FORM,
      controls: []
    };
    spyOn(DynamicSearchFormFactory, 'createDynamicSearchForm').and.returnValue(
      searchForm
    );

    var form = {
      httpMethod: 'post',
      path: '/segment1/segment2',
      tags: 'tag',
      type: FORM,
      controls: []
    };
    spyOn(DynamicFormFactory, 'createDynamicForm').and.returnValue(form);

    var result = DynamicComponentFactory.createDynamicComponents(
      apiPaths,
      apiModels
    );

    var createdForm = result.find((item) => item.type === FORM);
    var createdSearchForm = result.find((item) => item.type === SEARCH_FORM);

    expect(createdForm.httpMethod).toBe('post');
    expect(createdSearchForm.httpMethod).toBe('get');
  });

  it('creates form and search form for endpoints with additional common parameters.', () => {
    var path = '/segment1/segment2';
    var getApiMethod = {
      parameters: {
        schema: {
          name: 'id',
          type: 'int32'
        }
      }
    };
    var postApiMethod = {
      parameters: {
        name: 'id'
      }
    };
    var endpointParameters = [{ name: 'param1' }, { name: 'param2' }];
    var apiPaths = {
      '/segment1/segment2': {
        get: getApiMethod,
        post: postApiMethod,
        parameters: endpointParameters
      }
    };
    var apiModels = [];

    spyOn(DynamicComponentFactory, 'getDynamicComponentType')
      .withArgs('get', getApiMethod, path)
      .and.returnValue(SEARCH_FORM)
      .withArgs('post', postApiMethod, path)
      .and.returnValue(FORM);

    var searchForm = {
      httpMethod: 'get',
      path: '/segment1/segment2',
      tags: 'tag',
      type: SEARCH_FORM
    };
    spyOn(DynamicSearchFormFactory, 'createDynamicSearchForm').and.returnValue(
      searchForm
    );

    var form = {
      httpMethod: 'post',
      path: '/segment1/segment2',
      tags: 'tag',
      type: FORM
    };
    spyOn(DynamicFormFactory, 'createDynamicForm').and.returnValue(form);

    var controlsForEndpointParameters = [{ type: TEXT_INPUT }, { type: CHIPS }];
    spyOn(ControlFactory, 'createControlsForEndpointParameters')
      .withArgs(endpointParameters)
      .and.returnValue(controlsForEndpointParameters);

    var result = DynamicComponentFactory.createDynamicComponents(
      apiPaths,
      apiModels
    );

    var createdForm = result.find((item) => item.type === FORM);
    var createdSearchForm = result.find((item) => item.type === SEARCH_FORM);

    expect(createdForm.httpMethod).toBe('post');
    expect(createdSearchForm.httpMethod).toBe('get');
    result.forEach((component) => {
      expect(component.controls).toEqual(controlsForEndpointParameters);
    });
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
