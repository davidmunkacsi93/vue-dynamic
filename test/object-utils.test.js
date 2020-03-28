import { isPrimitive } from "../src/utils/object-utils";

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
});
