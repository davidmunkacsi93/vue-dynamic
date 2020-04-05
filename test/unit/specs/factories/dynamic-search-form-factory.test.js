import DynamicSearchFormFactory from '../../../../../src/factories/dynamic-search-form-factory';
import {
  SEARCH_FORM,
  TEXT_INPUT,
  NUMBER_INPUT
} from '../../../../../src/types/layout-item-types';
import ControlFactory from '../../../../../src/factories/control-factory';

describe('Tests for DynamicSearchFormFactory: ', () => {
  it('returns search form without parameters when no parameters defined', () => {
    var path = '/segment1/segment2';
    var httpMethod = 'get';
    var apiMethod = {
      tags: ['tag1', 'tag2'],
      parameters: []
    };
    var result = DynamicSearchFormFactory.createDynamicSearchForm(
      path,
      httpMethod,
      apiMethod
    );

    expect(result.httpMethod).toBe(httpMethod.toUpperCase());
    expect(result.path).toBe(path);
    expect(result.tags).toEqual(apiMethod.tags);
    expect(result.type).toBe(SEARCH_FORM);
    expect(result.controls).toEqual([]);
  });

  it('throws an error, when ControlFactory throws an error', () => {
    var path = '/segment1/segment2';
    var httpMethod = 'get';
    var apiMethod = {
      tags: ['tag1', 'tag2'],
      parameters: [{ name: 'param1' }]
    };

    spyOn(ControlFactory, 'createControlsForParameters').and.throwError();

    expect(() =>
      DynamicSearchFormFactory.createDynamicSearchForm(
        path,
        httpMethod,
        apiMethod
      )
    ).toThrowError();
  });

  it('returns search form with parameters', () => {
    var path = '/segment1/segment2';
    var httpMethod = 'get';
    var apiMethod = {
      tags: ['tag1', 'tag2'],
      parameters: [{ name: 'param1' }, { name: 'param2' }]
    };

    var controls = [
      { name: 'param1', type: TEXT_INPUT },
      { name: 'param2', type: NUMBER_INPUT }
    ];
    spyOn(ControlFactory, 'createControlsForParameters').and.returnValue(
      controls
    );

    var result = DynamicSearchFormFactory.createDynamicSearchForm(
      path,
      httpMethod,
      apiMethod
    );

    expect(result.httpMethod).toBe(httpMethod.toUpperCase());
    expect(result.path).toBe(path);
    expect(result.tags).toEqual(apiMethod.tags);
    expect(result.type).toBe(SEARCH_FORM);
    expect(result.controls).toEqual(controls);
  });
});
