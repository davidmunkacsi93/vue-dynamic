class OpenApi2Parser {
  processSpecification(specification) {
    var specificationVersion = specification.swagger;

    var apiInformation = this.getApiInformation(specification.info);
    var serverInformation = this.getServerInformation(specification);
    var apiModels = this.createApiModels(specification.definitions);
    var dynamicComponents = this.createDynamicComponentsForApi(
      specification.paths,
      apiModels.apiModels
    );

    var apiUIModel = {
      specificationVersion,
      ...apiInformation,
      ...serverInformation,
      apiModels,
      dynamicComponents,
      apiLayout: []
    };

    return apiUIModel;
  }

  getApiInformation(info) {
    return {
      apiVersion: info.version,
      title: info.title,
      description: info.description
    };
  }

  getServerInformation(specification) {
    const scheme = specification.schemes[0];
    return {
      serverURL: scheme + "://" + specification.host + specification.basePath
    };
  }
}

const instance = new OpenApi2Parser();
Object.freeze(instance);

export default instance;
