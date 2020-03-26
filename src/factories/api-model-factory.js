import { getLastURLSegment } from "../utils/helpers";

class ApiModelFactory {
  createApiModels(components) {
    var apiModels = [];
    if (!components) return;

    for (var definition in components) {
      const definitionObject = components[definition];

      if (!definitionObject) continue;

      var apiModel = {
        type: definition,
        required: definitionObject.required,
        properties: []
      };

      for (var propertyName in definitionObject.properties) {
        var propertyObject = definitionObject.properties[propertyName];
        if (!propertyObject) continue;

        var property = {
          name: propertyName,
          type: propertyObject.type,
          format: propertyObject.format,
          placeholder: propertyObject.example,
          isEnum: false
        };

        if (propertyObject.enum) {
          property.isEnum = true;
          property.enumValues = propertyObject.enum;
        }

        if (propertyObject.type === "array") {
          if (propertyObject.items.$ref) {
            property.arrayType = getLastURLSegment(propertyObject.items.$ref);
          } else {
            property.arrayType = propertyObject.items.type;
          }
        }
        apiModel.properties.push(property);
      }
      apiModels.push(apiModel);
    }
    return apiModels;
  }
}

const instance = new ApiModelFactory();
Object.freeze(instance);
export default instance;
