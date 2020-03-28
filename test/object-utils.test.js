import {
  isPrimitive,
  isNestedObject,
  isSimpleObject,
  arrayHasOnlySingleObjects
} from "../src/utils/object-utils";

describe("object-utils", () => {
  it("validates whether object is primitive", () => {
    const parameter = true;
    var result = isPrimitive(parameter);
    expect(result).toBe(true);
  });

  it("validates whether object is primitive", () => {
    const parameter = { nested: true };
    var result = isPrimitive(parameter);
    expect(result).toBe(false);
  });

  it("validates whether object is primitive", () => {
    const parameter = "string";
    var result = isPrimitive(parameter);
    expect(result).toBe(true);
  });

  it("validates whether object is primitive", () => {
    const parameter = 1;
    var result = isPrimitive(parameter);
    expect(result).toBe(true);
  });

  it("validates whether object is nested", () => {
    const simpleObject = {
      prop1: "test",
      prop2: "test",
      prop3: 3,
      prop4: true
    };
    var result = isNestedObject(simpleObject);
    expect(result).toBe(false);
  });

  it("validates whether object is nested", () => {
    const primitive = true;
    var result = isNestedObject(primitive);
    expect(result).toBe(false);
  });

  it("validates whether object is nested", () => {
    const nestedObject = {
      obj1: {
        prop1: "test"
      },
      prop2: "test",
      prop3: 3,
      prop4: true
    };
    var result = isNestedObject(nestedObject);
    expect(result).toBe(true);
  });

  it("validates whether object is simple", () => {
    const simpleObject = {
      prop1: "test",
      prop2: "test",
      prop3: 3,
      prop4: true
    };
    var result = isSimpleObject(simpleObject);
    expect(result).toBe(true);
  });

  it("validates whether object is simple", () => {
    const primitive = true;
    var result = isSimpleObject(primitive);
    expect(result).toBe(true);
  });

  it("validates whether object is simple", () => {
    const nestedObject = {
      obj1: {
        prop1: "test"
      },
      prop2: "test",
      prop3: 3,
      prop4: true
    };
    var result = isSimpleObject(nestedObject);
    expect(result).toBe(false);
  });

  it("validates whether array has only single objects", () => {
    const array = [
      { prop1: "test", prop2: 3, prop3: false },
      { prop1: "test2", prop2: 4, prop3: true },
      { prop1: "test3", prop2: 5, prop3: false },
      { prop1: "test4", prop2: 6, prop3: true }
    ];

    var result = arrayHasOnlySingleObjects(array);
    expect(result).toBe(true);
  });

  it("validates whether array has only single objects", () => {
    const array = [
      { obj1: { prop1: "test" }, prop2: 3, prop3: false },
      { prop1: "test2", prop2: 4, prop3: true },
      { prop1: "test3", prop2: 5, prop3: false },
      { prop1: "test4", prop2: 6, prop3: true }
    ];

    var result = arrayHasOnlySingleObjects(array);
    expect(result).toBe(false);
  });
});
