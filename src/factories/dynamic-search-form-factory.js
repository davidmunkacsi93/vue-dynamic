import { SEARCH_FORM } from '../types/layout-item-types';

import ControlFactory from './control-factory';

class DynamicSearchFormFactory {
  createDynamicSearchForm(path, httpMethod, apiMethod) {
    var dynamicSearchForm = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      tags: apiMethod.tags,
      type: SEARCH_FORM,
      controls: []
    };

    if (apiMethod.parameters) {
      var controls = ControlFactory.createControlsForParameters(apiMethod);
      dynamicSearchForm.controls = controls;
    }

    console.log(dynamicSearchForm);

    return dynamicSearchForm;
  }
}

const instance = new DynamicSearchFormFactory();
Object.freeze(instance);
export default instance;
