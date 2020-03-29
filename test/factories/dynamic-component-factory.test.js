import DynamicComponentFactory from '../../src/factories/dynamic-component-factory';
import { FORM, SEARCH_FORM } from '../../src/types/layout-item-types';

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

  it('get method and with unspecified content should be a search form.', () => {
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

  it('get method and with unspecified OK status should throw an error.', () => {
    var httpMethod = 'get';
    var apiMethod = {
      responses: {
        '201': {
          description: 'created'
        }
      }
    };
    var path = '/test/segment';

    expect(() => {
      DynamicComponentFactory.getDynamicComponentType(
        httpMethod,
        apiMethod,
        path
      );
    }).toThrowError('get - /test/segment does not specify OK status code.');
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
