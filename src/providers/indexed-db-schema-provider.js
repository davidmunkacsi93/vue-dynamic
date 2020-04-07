export default class IndexedDbSchemaProvider {
  static getSchema() {
    return {
      configurations: '++id,name,value',
      apiKeys: '++id,apiKey,parameterName,type,url',
      apiModels:
        '++id,specificationVersion,apiVersion,title,serverDescription,serverURL,dynamicComponents,apiLayouts,compacted,apiPath'
    };
  }
}
