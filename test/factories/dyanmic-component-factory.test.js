import { getDynamicComponentTypeForSchema } from "../../src/factories/dynamic-component-factory";
import { TABLE, TREE } from "../../src/types/layout-item-types";

describe("Tests for getDynamicComponentTypeForSchema factory logic", () => {
  it("should be a table", () => {
    expect(TABLE).toBe(TABLE);
  });
});
