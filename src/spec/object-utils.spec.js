import {
  isNestedObject,
  isSimpleObject,
  isPrimitive
} from "../utils/object-utils";

describe("Testing object-utils", () => {
  it("Should be primitive", () => {
    var testObject = false;
    var result = isPrimitive(testObject);
    expect(result).toBe(true);
  });
});
