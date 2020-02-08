import EventBus from "../../utils/event-bus.js";
import {
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  INITIALIZE_MAIN_LAYOUT,
  LOAD_MAIN_LAYOUT,
  SAVE_MAIN_LAYOUT,
  SET_MAIN_LAYOUT_ITEMS
} from "../../types/action-types";
import { CONTENT, MENU, NAVIGATION_BAR } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";

const LOCAL_STORAGE_MAIN_LAYOUT_KEY = "main-layout";

const state = {
  isEditModeActive: false,
  mainLayoutItems: []
};

const mutations = {
  enableEditMode(state) {
    for (var layoutItem of state.mainLayoutItems) {
      layoutItem.static = false;
    }

    state.isEditModeActive = true;
  },
  disableEditMode(state) {
    for (var layoutItem of state.mainLayoutItems) {
      layoutItem.static = true;
    }

    state.isEditModeActive = false;
  },
  initializeMainLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUT_KEY);
    if (layoutString) return;

    const menu = {
      x: 2,
      y: 0,
      w: 10,
      h: 2,
      i: 0,
      isDraggable: true,
      isResizable: true,
      static: false,
      layoutItemType: MENU
    };
    const content = {
      x: 2,
      y: 2,
      w: 10,
      h: 10,
      i: 1,
      isDraggable: true,
      isResizable: true,
      static: false,
      layoutItemType: CONTENT
    };
    const navigationBar = {
      x: 0,
      y: 0,
      w: 2,
      h: 12,
      i: 2,
      isDraggable: true,
      isResizable: true,
      static: false,
      layoutItemType: NAVIGATION_BAR
    };

    state.mainLayoutItems.push(menu);
    state.mainLayoutItems.push(content);
    state.mainLayoutItems.push(navigationBar);

    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUT_KEY,
      JSON.stringify(state.mainLayoutItems)
    );
  },
  loadMainLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUT_KEY);
    if (!layoutString) {
      return;
    }

    const parsedLayout = JSON.parse(layoutString);
    state.mainLayoutItems = parsedLayout;
    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
  },
  saveMainLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUT_KEY,
      JSON.stringify(state.mainLayoutItems)
    );
  },
  setMainLayoutItems(state, mainLayoutItems) {
    state.mainLayoutItems = mainLayoutItems;
    EventBus.$emit(LAYOUT_UPDATED);
  }
};

const actions = {
  disableEditMode({ commit }) {
    commit(DISABLE_EDIT_MODE);
  },
  enableEditMode({ commit }) {
    commit(ENABLE_EDIT_MODE);
  },
  loadMainLayout({ commit }) {
    commit(INITIALIZE_MAIN_LAYOUT);
    commit(LOAD_MAIN_LAYOUT);
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
