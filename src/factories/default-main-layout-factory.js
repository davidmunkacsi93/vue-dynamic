import { v1 as uuid } from "uuid";
import { CONTENT, MENU, NAVIGATION_BAR } from "../types/layout-item-types";

class DefaultMainLayoutFactory {
  getDefaultMainLayout() {
    return {
      lg: this.getLayoutItemsForLg(),
      md: this.getLayoutItemsForMd(),
      sm: this.getLayoutItemsForSm(),
      xs: this.getLayoutItemsForXs(),
      xxs: this.getLayoutItemsForXxs()
    };
  }

  getLayoutItemsForLg() {
    var layoutItems = [];
    const menu = {
      x: 0,
      y: 0,
      w: 12,
      h: 2,
      i: uuid(),
      autoSizeRequired: false,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      uuid: uuid(),
      type: MENU
    };
    const content = {
      x: 3,
      y: 2,
      w: 9,
      h: 10,
      i: uuid(),
      autoSizeRequired: true,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      uuid: uuid(),
      type: CONTENT
    };
    const navigationBar = {
      x: 0,
      y: 2,
      w: 3,
      h: 15,
      i: uuid(),
      autoSizeRequired: false,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      hidden: false,
      uuid: uuid(),
      type: NAVIGATION_BAR
    };
    layoutItems.push(menu);
    layoutItems.push(navigationBar);
    layoutItems.push(content);

    return layoutItems;
  }

  getLayoutItemsForMd() {
    var layoutItems = [];
    const menu = {
      x: 2,
      y: 0,
      w: 8,
      h: 2,
      i: uuid(),
      autoSizeRequired: false,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      uuid: uuid(),
      type: MENU
    };
    const content = {
      x: 2,
      y: 2,
      w: 8,
      h: 10,
      i: uuid(),
      autoSizeRequired: true,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      uuid: uuid(),
      type: CONTENT
    };
    const navigationBar = {
      x: 0,
      y: 0,
      w: 2,
      h: 15,
      i: uuid(),
      autoSizeRequired: false,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      hidden: false,
      uuid: uuid(),
      type: NAVIGATION_BAR
    };
    layoutItems.push(menu);
    layoutItems.push(navigationBar);
    layoutItems.push(content);

    return layoutItems;
  }

  getLayoutItemsForSm() {
    var layoutItems = [];
    const menu = {
      x: 0,
      y: 0,
      w: 6,
      h: 2,
      i: uuid(),
      autoSizeRequired: false,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      uuid: uuid(),
      type: MENU
    };
    const navigationBar = {
      x: 0,
      y: 2,
      w: 6,
      h: 10,
      i: uuid(),
      autoSizeRequired: false,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      hidden: false,
      uuid: uuid(),
      type: NAVIGATION_BAR
    };
    const content = {
      x: 0,
      y: 12,
      w: 6,
      h: 10,
      i: uuid(),
      autoSizeRequired: true,
      isDraggable: true,
      isResizable: true,
      static: true,
      initialized: true,
      uuid: uuid(),
      type: CONTENT
    };
    layoutItems.push(menu);
    layoutItems.push(navigationBar);
    layoutItems.push(content);

    return layoutItems;
  }

  getLayoutItemsForXs() {
    return this.getLayoutItemsForSm();
  }

  getLayoutItemsForXxs() {
    return this.getLayoutItemsForXs();
  }
}

const instance = new DefaultMainLayoutFactory();
Object.freeze(instance);
export default instance;
