import ApiModelFactory from "../factories/api-model-factory";
import DynamicComponentFactory from "../factories/dynamic-component-factory";
import OpenApiInformationProvider from "../providers/open-api-information-provider";

class OpenApi3Parser {
  processSpecification(specification) {
    var version = specification.openapi;

    var apiInformation = OpenApiInformationProvider.getApiInformation(
      specification.info
    );
    var serverInformation = OpenApiInformationProvider.getServerInformation(
      specification
    );

    var apiModels = ApiModelFactory.createApiModels(
      specification.components.schemas,
      "#/components/schemas/"
    );
    var dynamicComponents = DynamicComponentFactory.createDynamicComponentsForApi(
      specification.paths,
      apiModels
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

const instance = new OpenApi3Parser();
Object.freeze(instance);
export default instance;
