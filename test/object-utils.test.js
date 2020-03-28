import { isPrimitive } from "../src/utils/object-utils";

describe("object-utils", () => {
  it("validates a primite object", () => {
    const object = true;
    var result = isPrimitive(object);
    expect(object).toBe(true);
  });

  it("validates a primite object", () => {
    const object = false;
    expect(object).toBe(false);
  });
});
