import EventBus from "../../utils/event-bus.js";
import {
  DISABLE_EDIT_MODE_MAIN_LAYOUT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  INITIALIZE_MAIN_LAYOUT,
  LOAD_MAIN_LAYOUT,
  SAVE_MAIN_LAYOUT,
  SET_CONTENT_HEIGHT
} from "../../types/action-types";
import { CONTENT, MENU, NAVIGATION_BAR } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";
import { v1 as uuid } from "uuid";

function getLayoutItemsForLg() {
  var layoutItems = [];
  const menu = {
    x: 2,
    y: 0,
    w: 10,
    h: 2,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: MENU
  };
  const content = {
    x: 2,
    y: 2,
    w: 10,
    h: 10,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: CONTENT
  };
  const navigationBar = {
    x: 0,
    y: 0,
    w: 2,
    h: 15,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: NAVIGATION_BAR
  };
  layoutItems.push(menu);
  layoutItems.push(navigationBar);
  layoutItems.push(content);

  return layoutItems;
}

function getLayoutItemsForMd() {
  var layoutItems = [];
  const menu = {
    x: 2,
    y: 0,
    w: 8,
    h: 2,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: MENU
  };
  const content = {
    x: 2,
    y: 2,
    w: 8,
    h: 10,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: CONTENT
  };
  const navigationBar = {
    x: 0,
    y: 0,
    w: 2,
    h: 15,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: NAVIGATION_BAR
  };
  layoutItems.push(menu);
  layoutItems.push(navigationBar);
  layoutItems.push(content);

  return layoutItems;
}

function getLayoutItemsForSm() {
  var layoutItems = [];
  const menu = {
    x: 0,
    y: 0,
    w: 6,
    h: 2,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: MENU
  };
  const navigationBar = {
    x: 0,
    y: 2,
    w: 6,
    h: 10,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: NAVIGATION_BAR
  };
  const content = {
    x: 0,
    y: 12,
    w: 6,
    h: 10,
    i: uuid(),
    isDraggable: true,
    isResizable: true,
    static: true,
    layoutItemType: CONTENT
  };
  layoutItems.push(menu);
  layoutItems.push(navigationBar);
  layoutItems.push(content);

  return layoutItems;
}

function getLayoutItemsForXs() {
  return getLayoutItemsForSm();
}

function getLayoutItemsForXxs() {
  return getLayoutItemsForXs();
}

const LOCAL_STORAGE_MAIN_LAYOUTS_KEY = "main-layouts";

const state = {
  currentScreenClass: null,
  isEditModeActive: false,
  mainLayouts: {}
};

const mutations = {
  disableEditModeMainLayout(state) {
    var screenClasses = Object.keys(state.mainLayouts);
    for (var screenClass of screenClasses) {
      for (var layoutItem of state.mainLayouts[screenClass]) {
        layoutItem.static = true;
      }
    }

    state.isEditModeActive = false;
  },
  enableEditModeMainLayout(state) {
    var screenClasses = Object.keys(state.mainLayouts);
    for (var screenClass of screenClasses) {
      for (let layoutItem of state.mainLayouts[screenClass]) {
        layoutItem.static = false;
      }
    }

    state.isEditModeActive = true;
  },
  initializeMainLayout(state, screenClass) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUTS_KEY);
    if (layoutString) return;

    state.mainLayouts = {
      lg: getLayoutItemsForLg(),
      md: getLayoutItemsForMd(),
      sm: getLayoutItemsForSm(),
      xs: getLayoutItemsForXs(),
      xxs: getLayoutItemsForXxs()
    };

    state.currentScreenClass = screenClass;

    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);

    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUTS_KEY,
      JSON.stringify(state.mainLayouts)
    );
  },
  loadMainLayout(state, screenClass) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUTS_KEY);
    if (!layoutString) {
      return;
    }
    const parsedLayouts = JSON.parse(layoutString);
    state.mainLayouts = parsedLayouts;
    state.currentScreenClass = screenClass;

    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
  },
  saveMainLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUTS_KEY,
      JSON.stringify(state.mainLayouts)
    );
  },
  setContentHeight(state, height) {
    var content = state.mainLayouts[state.currentScreenClass].find(
      item => item.layoutItemType === CONTENT
    );
    content.h = height;
  }
};

const actions = {
  disableEditModeMainLayout({ commit }) {
    commit(DISABLE_EDIT_MODE_MAIN_LAYOUT);
  },
  enableEditModeMainLayout({ commit }) {
    commit(ENABLE_EDIT_MODE_MAIN_LAYOUT);
  },
  loadMainLayout({ commit }, screenClass) {
    commit(INITIALIZE_MAIN_LAYOUT, screenClass);
    commit(LOAD_MAIN_LAYOUT, screenClass);
  },
  saveMainLayout({ commit }) {
    commit(SAVE_MAIN_LAYOUT);
  },
  setContentHeight({ commit }, height) {
    commit(SET_CONTENT_HEIGHT, height);
  }
};

export default {
  state,
  mutations,
  actions
};
