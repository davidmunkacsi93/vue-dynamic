import ApiModelFactory from "../factories/api-model-factory";
import DynamicComponentFactory from "../factories/dynamic-component-factory";
import OpenApiInformationProvider from "../providers/open-api-information-provider";
import DefaultApiLayoutFactory from "../factories/default-api-layout-factory";

class OpenApiParser {
  processSpecification(specification) {
    var specificationVersion = specification.openapi || specification.swagger;
    var apiInformation = OpenApiInformationProvider.getApiInformation(
      specification.info
    );
    var serverInformation = OpenApiInformationProvider.getServerInformation(
      specification
    );

    var schemas = specification.components
      ? specification.components.schemas
      : specification.definitions;

    var apiModels = ApiModelFactory.createApiModels(schemas);
    var dynamicComponents = DynamicComponentFactory.createDynamicComponents(
      specification.paths,
      apiModels
    );

    var defaultApiLayout = DefaultApiLayoutFactory.getDefaultApiLayout(
      apiInformation.apiVersion,
      apiInformation.description,
      apiInformation.title,
      dynamicComponents
    );

    var defaultLayout = {
      ...defaultApiLayout,
      compacted: false
    };

    var apiUIModel = {
      specificationVersion,
      ...apiInformation,
      ...serverInformation,
      apiModels,
      dynamicComponents,
      apiLayouts: {
        xxs: defaultLayout,
        xs: defaultLayout,
        sm: defaultLayout,
        md: defaultLayout,
        lg: defaultLayout
      },
      compacted: false
    };
    return apiUIModel;
  }
}

const instance = new OpenApiParser();
Object.freeze(instance);
export default instance;