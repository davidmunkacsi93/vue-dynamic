export default class IndexedDbSchemaProvider {
  static getSchema() {
    return {
      configurations: '++id,name,value',
      apiKeys: '++id,apiKey,parameterName,type,url',
      apiModels:
        '++id,specificationVersion,apiVersion,title,serverDescription,serverURL,compacted,apiPath',
      dynamicComponents:
        '++id,apiModelId,httpMethod,path,tags,type,w,h,x,y,i,uuid,isDraggable,isResizable,initialized,static',
      controls:
        '++id,dynamicComponentId,label,in,required,type,format,minimum,maximum,default,value,element,values,description,w,h,x,y,i,uuid,isDraggable,isResizable,initialized,static'
    };
  }
}
