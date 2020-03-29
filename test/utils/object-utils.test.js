import {
  isPrimitive,
  isNestedObject,
  isSimpleObject,
  arrayHasOnlySingleObjects,
  arrayHasOnlyPrimitives,
  isSingleObject
} from '../../src/utils/object-utils';

describe('Tests for isPrimitive utility function:', () => {
  it('should be primitive', () => {
    const parameter = true;
    var result = isPrimitive(parameter);
    expect(result).toBe(true);
  });

  it('should not be primitive', () => {
    const parameter = { nested: true };
    var result = isPrimitive(parameter);
    expect(result).toBe(false);
  });

  it('should be primitive', () => {
    const parameter = 'string';
    var result = isPrimitive(parameter);
    expect(result).toBe(true);
  });

  it('should be primitive', () => {
    const parameter = 1;
    var result = isPrimitive(parameter);
    expect(result).toBe(true);
  });
});

describe('Tests for isNestedObject utility function:', () => {
  it('should not be a nested object', () => {
    const simpleObject = {
      prop1: 'test',
      prop2: 'test',
      prop3: 3,
      prop4: true
    };
    var result = isNestedObject(simpleObject);
    expect(result).toBe(false);
  });

  it('should not be a nested object', () => {
    const primitive = true;
    var result = isNestedObject(primitive);
    expect(result).toBe(false);
  });

  it('should be a nested object', () => {
    const nestedObject = {
      obj1: {
        prop1: 'test'
      },
      prop2: 'test',
      prop3: 3,
      prop4: true
    };
    var result = isNestedObject(nestedObject);
    expect(result).toBe(true);
  });
});

describe('Tests for isSimpleObject utility function:', () => {
  it('should be a simple object', () => {
    const simpleObject = {
      prop1: 'test',
      prop2: 'test',
      prop3: 3,
      prop4: true
    };
    var result = isSimpleObject(simpleObject);
    expect(result).toBe(true);
  });

  it('should be a simple object', () => {
    const primitive = true;
    var result = isSimpleObject(primitive);
    expect(result).toBe(true);
  });

  it('should not be a simple object', () => {
    const nestedObject = {
      obj1: {
        prop1: 'test'
      },
      prop2: 'test',
      prop3: 3,
      prop4: true
    };
    var result = isSimpleObject(nestedObject);
    expect(result).toBe(false);
  });
});

describe('Tests for arrayHasSimpleObjects utility function:', () => {
  it('should be consisting of single objects', () => {
    const array = [
      { prop1: 'test', prop2: 3, prop3: false },
      { prop1: 'test2', prop2: 4, prop3: true },
      { prop1: 'test3', prop2: 5, prop3: false },
      { prop1: 'test4', prop2: 6, prop3: true }
    ];

    var result = arrayHasOnlySingleObjects(array);
    expect(result).toBe(true);
  });

  it('should not be consisting of single objects', () => {
    const array = [
      { obj1: { prop1: 'test' }, prop2: 3, prop3: false },
      { prop1: 'test2', prop2: 4, prop3: true },
      { prop1: 'test3', prop2: 5, prop3: false },
      { prop1: 'test4', prop2: 6, prop3: true }
    ];

    var result = arrayHasOnlySingleObjects(array);
    expect(result).toBe(false);
  });
});

describe('Tests for arrayHasOnlyPrimitives utility function:', () => {
  it('should be consisting of primitives', () => {
    const array = ['val1', 'val2', 'val3'];

    var result = arrayHasOnlyPrimitives(array);
    expect(result).toBe(true);
  });

  it('should not be consisting of primitives', () => {
    const array = ['val1', 'val2', 'val3', { prop1: false }];

    var result = arrayHasOnlyPrimitives(array);
    expect(result).toBe(false);
  });
});

describe('Tests for isSingleObject utility function:', () => {
  it('should be an object', () => {
    var parameter = {};

    var result = isSingleObject(parameter);
    expect(result).toBe(true);
  });

  it('should not be an object', () => {
    const array = ['val1', 'val2', 'val3', { prop1: false }];

    var result = isSingleObject(array);
    expect(result).toBe(false);
  });

  it('should not be an object', () => {
    const num = 1;

    var result = isSingleObject(num);
    expect(result).toBe(false);
  });
});
