import EventBus from "../../utils/event-bus.js";
import {
  DISABLE_EDIT_MODE_MAIN_LAYOUT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  INITIALIZE_MAIN_LAYOUT,
  LOAD_MAIN_LAYOUT,
  SAVE_MAIN_LAYOUT,
  SET_MAIN_LAYOUT_ITEMS
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
  return getLayoutItemsForLg();
}

function getLayoutItemsForSm() {
  var layoutItems = [];
  const menu = {
    x: 0,
    y: 0,
    w: 12,
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
    w: 12,
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
    w: 12,
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
  isEditModeActive: false,
  mainLayouts: {},
  mainLayout: []
};

const mutations = {
  disableEditModeMainLayout(state) {
    for (var layout of state.mainLayouts) {
      for (var layoutItem of layout) {
        layoutItem.static = true;
      }
    }
    state.isEditModeActive = false;
  },
  enableEditModeMainLayout(state) {
    for (var layout of state.mainLayouts) {
      for (var layoutItem of layout) {
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

    state.mainLayout = state.mainLayouts[screenClass];

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
    state.mainLayout = state.mainLayouts[screenClass];

    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
  },
  saveMainLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUTS_KEY,
      JSON.stringify(state.mainLayouts)
    );
  },
  setMainLayoutItems(state, mainLayout) {
    console.log(mainLayout);
    state.mainLayout = mainLayout;
    EventBus.$emit(LAYOUT_UPDATED);
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
  setMainLayoutItems({ commit }, mainLayoutItems) {
    commit(SET_MAIN_LAYOUT_ITEMS, mainLayoutItems);
  }
};

export default {
  state,
  mutations,
  actions
};
