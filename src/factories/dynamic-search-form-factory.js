import { SEARCH_FORM } from '../types/layout-item-types';

import ControlFactory from './control-factory';

export default class DynamicSearchFormFactory {
  static createDynamicSearchForm(path, httpMethod, apiMethod) {
    var dynamicSearchForm = {
      httpMethod: httpMethod.toUpperCase(),
      path: path,
      tags: apiMethod.tags,
      type: SEARCH_FORM,
      controls: []
    };

    if (apiMethod.parameters) {
      var controls = ControlFactory.createControlsForParameters(apiMethod);
      if (controls.length > 0) {
        dynamicSearchForm.controls = controls;
      }
    }

    return dynamicSearchForm;
  }
}
