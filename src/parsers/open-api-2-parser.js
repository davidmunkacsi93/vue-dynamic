import ApiModelFactory from "../factories/api-model-factory";
import DynamicComponentFactory from "../factories/dynamic-component-factory";
import OpenApiInformationProvider from "../providers/open-api-information-provider";

class OpenApi2Parser {
  processSpecification(specification) {
    var version = specification.swagger;

    var apiInformation = OpenApiInformationProvider.getApiInformation(
      specification.info
    );
    var serverInformation = OpenApiInformationProvider.getServerInformation(
      specification
    );

    var apiModels = ApiModelFactory.createApiModels(
      specification.definitions,
      "#/definitions/"
    );
    var dynamicComponents = DynamicComponentFactory.createDynamicComponentsForApi(
      specification.paths,
      apiModels.apiModels
    );

    var apiUIModel = {
      version,
      ...apiInformation,
      ...serverInformation,
      apiModels,
      dynamicComponents,
      apiLayout: []
    };

    return apiUIModel;
  }
}

const instance = new OpenApi2Parser();
Object.freeze(instance);

export default instance;
