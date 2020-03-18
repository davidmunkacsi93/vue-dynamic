import ApiModelFactory from "../factories/api-model-factory";
import DynamicComponentFactory from "../factories/dynamic-component-factory";
import OpenApiInformationProvider from "../providers/open-api-information-provider";

class OpenApi3Parser {
  processSpecification(specification) {
    var specificationVersion = specification.openapi;

    var apiInformation = OpenApiInformationProvider.getApiInformation(
      specification.info
    );
    var serverInformation = OpenApiInformationProvider.getServerInformation(
      specification
    );

    var apiModels = ApiModelFactory.createApiModels(
      specification.components.schemas
    );
    var dynamicComponents = DynamicComponentFactory.createDynamicComponents(
      specification.paths,
      apiModels
    );

    var apiUIModel = {
      specificationVersion,
      ...apiInformation,
      ...serverInformation,
      apiModels,
      dynamicComponents,
      apiLayout: [],
      compacted: false
    };

    return apiUIModel;
  }
}

const instance = new OpenApi3Parser();
Object.freeze(instance);
export default instance;
