import {
  DISABLE_EDIT_MODE_MAIN_LAYOUT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  INITIALIZE_MAIN_LAYOUT,
  LOAD_MAIN_LAYOUT,
  SAVE_MAIN_LAYOUT,
  SET_CONTENT_HEIGHT,
  SET_NAVIGATION_BAR_HEIGHT,
  SET_SCREEN_CLASS,
  TOGGLE_NAVIGATION_BAR
} from '../../types/action-types';
import { CONTENT, NAVIGATION_BAR } from '../../types/layout-item-types';
import DefaultMainLayoutFactory from '../../factories/default-main-layout-factory';

const LOCAL_STORAGE_MAIN_LAYOUTS_KEY = 'main-layouts';

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
  initializeMainLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUTS_KEY);
    if (layoutString) return;

    state.mainLayouts = DefaultMainLayoutFactory.getDefaultMainLayout();

    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUTS_KEY,
      JSON.stringify(state.mainLayouts)
    );
  },
  loadMainLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUTS_KEY);
    if (!layoutString) {
      return;
    }
    const parsedLayouts = JSON.parse(layoutString);
    state.mainLayouts = parsedLayouts;
  },
  saveMainLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUTS_KEY,
      JSON.stringify(state.mainLayouts)
    );
  },
  setContentHeight(state, height) {
    if (!state.currentScreenClass) return;

    var content = state.mainLayouts[state.currentScreenClass].find(
      (item) => item.type === CONTENT
    );
    content.h = height;
  },
  setNavigationBarHeight(state, height) {
    if (!state.currentScreenClass) return;

    var navigationBar = state.mainLayouts[state.currentScreenClass].find(
      (item) => item.type === NAVIGATION_BAR
    );
    navigationBar.h = height;
  },
  setScreenClass(state, screenClass) {
    state.currentScreenClass = screenClass;
  },
  toggleNavigationBar(state) {
    var screenClasses = Object.keys(state.mainLayouts);
    for (var screenClass of screenClasses) {
      var layout = state.mainLayouts[screenClass];
      var navigationBar = layout.find((item) => item.type === NAVIGATION_BAR);
      navigationBar.hidden = !navigationBar.hidden;
    }
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
    commit(SET_SCREEN_CLASS, screenClass);
    commit(INITIALIZE_MAIN_LAYOUT);
    commit(LOAD_MAIN_LAYOUT);
  },
  saveMainLayout({ commit }) {
    commit(SAVE_MAIN_LAYOUT);
  },
  setContentHeight({ commit }, height) {
    commit(SET_CONTENT_HEIGHT, height);
  },
  setNavigationBarHeight({ commit }, height) {
    commit(SET_NAVIGATION_BAR_HEIGHT, height);
  },
  setScreenClass({ commit }, screenClass) {
    commit(SET_SCREEN_CLASS, screenClass);
  },
  toggleNavigationBar({ commit }) {
    commit(TOGGLE_NAVIGATION_BAR);
  }
};

export default {
  state,
  mutations,
  actions
};
