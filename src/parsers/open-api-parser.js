import DynamicComponentFactory from '../factories/dynamic-component-factory';
import OpenApiInformationProvider from '../providers/open-api-information-provider';
import DefaultApiLayoutFactory from '../factories/default-api-layout-factory';

export default class OpenApiParser {
  static processSpecification(specification) {
    if (!specification) {
      throw new Error('Specification cannot be determined.');
    }
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
    console.log(Object.keys(schemas).length);

    var dynamicComponents = DynamicComponentFactory.createDynamicComponents(
      specification.paths,
      schemas
    );

    var defaultLayout = DefaultApiLayoutFactory.getDefaultApiLayout(
      dynamicComponents
    );

    var apiUIModel = {
      specificationVersion,
      ...apiInformation,
      ...serverInformation,
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
