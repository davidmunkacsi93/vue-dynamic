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
