import { v1 as uuid } from "uuid";
import { HEADER } from "../types/layout-item-types";

class DefaultApiLayoutFactory {
  getDefaultApiLayout(apiVersion, description, title, dynamicComponents) {
    var layout = [];
    var header = this.createHeader(apiVersion, description, title);
    layout.push(header);
    this.createDynamicComponents(dynamicComponents).forEach(component =>
      layout.push(component)
    );
    return layout;
  }

  createHeader(apiVersion, description, title) {
    return {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      i: 0,
      uuid: uuid(),
      isDraggable: true,
      isResizable: true,
      static: false,
      initialized: false,
      apiVersion: apiVersion,
      description: description,
      title: title,
      type: HEADER
    };
  }

  createDynamicComponents(dynamicComponents) {
    var result = [];

    // TODO: Temporarily filter empty objects (grids).
    dynamicComponents
      .filter(dynamicComponent => Object.keys(dynamicComponent).length > 0)
      .forEach((dynamicComponent, index) => {
        var component = {
          x: (index % 3) * 3,
          y: (index + 2) * 5,
          w: 3,
          h: 5,
          i: index + 1,
          uuid: uuid(),
          isDraggable: true,
          isResizable: true,
          static: false,
          initialized: false,
          ...dynamicComponent
        };
        result.push(component);
      });

    return result;
  }
}

const instance = new DefaultApiLayoutFactory();
Object.freeze(instance);
export default instance;
