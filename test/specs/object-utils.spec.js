import { isPrimitive } from "../../src/utils/object-utils";

describe("object-utils", () => {
  it("validates a primite object", () => {
    const object = true;
    var result = isPrimitive(object);
    expect(result).toBe(true);
  });
});
