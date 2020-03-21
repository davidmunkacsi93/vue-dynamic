import { v1 as uuid } from "uuid";

class DefaultApiLayoutFactory {
  getDefaultApiLayout(dynamicComponents) {
    var layout = [];
    this.createDynamicComponents(dynamicComponents).forEach(component =>
      layout.push(component)
    );
    return layout;
  }

  createDynamicComponents(dynamicComponents) {
    var result = [];

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
