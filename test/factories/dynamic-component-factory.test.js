import DynamicComponentFactory from "../../src/factories/dynamic-component-factory";
import { FORM, TREE } from "../../src/types/layout-item-types";

describe("Tests for getDynamicComponentType factory logic", () => {
  it("should be a tree for get method and with specified response", () => {
    var httpMethod = "get";
    var apiMethod = {
      responses: {
        "200": {
          content: {
            schema: {
              type: "array"
            }
          }
        }
      }
    };

    var result = DynamicComponentFactory.getDynamicComponentType(
      httpMethod,
      apiMethod
    );
    expect(result).toBe(TREE);
  });

  it("should be a tree for get method and with unspecified content", () => {
    var httpMethod = "get";
    var apiMethod = {
      responses: {
        "200": {
          description: "OK"
        }
      }
    };

    var result = DynamicComponentFactory.getDynamicComponentType(
      httpMethod,
      apiMethod
    );
    expect(result).toBe(FORM);
  });

  it("should be a form for post, put, delete method", () => {
    var httpMethods = ["post", "put", "delete"];
    var apiMethod = {};

    httpMethods.forEach(httpMethod => {
      var result = DynamicComponentFactory.getDynamicComponentType(
        httpMethod,
        apiMethod
      );
      expect(result).toBe(FORM);
    });
  });
});
