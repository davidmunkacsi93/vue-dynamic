class OpenApi2Parser {
  processSpecification(specification) {
    var version = {
      specificationVersion: specification.swagger
    };
    var metadata = this.extractApiInformation(specification.info);
    var serverMetadata = this.extractServerInformation(specification);
    var apiModels = this.createApiModelsFromSchemaObjects(
      specification.definitions
    );
    var dynamicComponents = this.createDynamicComponentsForApi(
      version.specificationVersion,
      specification.paths,
      apiModels.apiModels
    );

    var apiUIModel = {
      ...version,
      ...metadata,
      ...serverMetadata,
      ...apiModels,
      ...dynamicComponents,
      apiLayout: []
    };

    return apiUIModel;
  }

  extractApiInformation(info) {
    return {
      apiVersion: info.version,
      title: info.title,
      description: info.description
    };
  }

  extractServerInformation(specification) {
    const scheme = specification.schemes[0];
    return {
      serverURL: scheme + "://" + specification.host + specification.basePath
    };
  }
}

const instance = new OpenApi2Parser();
Object.freeze(instance);

export default instance;
