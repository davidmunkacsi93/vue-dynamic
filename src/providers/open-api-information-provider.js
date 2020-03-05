class OpenApiInformationProvider {
  getApiInformation(specificationInfo) {
    return {
      apiVersion: specificationInfo.version,
      title: specificationInfo.title,
      description: specificationInfo.description
    };
  }

  getServerInformation(specification) {
    if (specification.servers) {
      return {
        serverDescription: specification.servers[0].description,
        serverURL: specification.servers[0].url
      };
    } else if (specification.schemes) {
      return {
        serverDescription: null,
        serverURL:
          specification.schemes[0] +
          "://" +
          specification.host +
          specification.basePath
      };
    } else {
      throw new Error("Unknown specification!");
    }
  }
}

const instance = new OpenApiInformationProvider();
Object.freeze(instance);
export default instance;
