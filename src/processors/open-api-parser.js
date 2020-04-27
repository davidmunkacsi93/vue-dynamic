import DynamicComponentFactory from '../factories/dynamic-component-factory';
import OpenApiInformationProvider from '../providers/open-api-information-provider';

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

    var dynamicComponents = DynamicComponentFactory.createDynamicComponents(
      specification.paths,
      schemas
    );

    var apiUIModel = {
      specificationVersion,
      ...apiInformation,
      ...serverInformation,
      dynamicComponents,
      compacted: false
    };
    return apiUIModel;
  }
}
