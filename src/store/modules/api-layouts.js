import {
  LOAD_API_LAYOUT,
  REMOVE_FORM,
  SET_API_LAYOUT_ITEMS,
  SAVE_API_LAYOUT,
  LOAD_APIS,
  ADD_NEW_API,
  DISABLE_EDIT_MODE_API_LAYOUT,
  ENABLE_EDIT_MODE_API_LAYOUT,
  SET_API_ITEM_HEIGHT,
  SET_API_ITEM_WIDTH,
  SET_API_ITEM_INTIAILIZED,
  SET_API_LAYOUTS,
  SET_API_LAYOUT_COMPACTED
} from "../../types/action-types";
import { getCurrentScreenClass } from "../../utils/responsive-utils";

const LOCAL_STORAGE_API_LAYOUT_KEY = "api-layouts";

function getNextId() {
  if (!state.apis || state.apis.length === 0) return 0;

  const apiWithHighestId = state.apis.reduce((previous, current) =>
    previous.apiId > current.apiId ? previous : current
  );
  return apiWithHighestId.apiId + 1;
}

const state = {
  currentApiId: -1,
  isEditModeActive: false,
  apis: []
};

const mutations = {
  addNewApi(state, apiModel) {
    apiModel.apiId = getNextId();
    apiModel.apiPath = "/api/" + apiModel.apiId;
    state.apis.push(apiModel);

    localStorage.setItem(
      LOCAL_STORAGE_API_LAYOUT_KEY,
      JSON.stringify(state.apis)
    );
  },

  disableEditModeApiLayout(state) {
    var apiLayouts = state.apis[state.currentApiId].apiLayouts;
    var screenClasses = Object.keys(apiLayouts);
    for (var screenClass of screenClasses) {
      for (let layoutItem of apiLayouts[screenClass]) {
        layoutItem.static = true;
      }
    }

    state.isEditModeActive = false;
  },

  enableEditModeApiLayout(state) {
    var apiLayouts = state.apis[state.currentApiId].apiLayouts;
    var screenClasses = Object.keys(apiLayouts);
    for (var screenClass of screenClasses) {
      for (let layoutItem of apiLayouts[screenClass]) {
        layoutItem.static = false;
      }
    }
    console.log(apiLayouts);
    state.isEditModeActive = true;
  },

  loadApis(state) {
    const apiString = localStorage.getItem(LOCAL_STORAGE_API_LAYOUT_KEY);
    if (!apiString) {
      return;
    }
    const parsedApis = JSON.parse(apiString);
    state.apis = parsedApis;
  },

  loadApiLayout(state, apiId) {
    state.currentApiId = apiId;
  },

  saveApiLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_API_LAYOUT_KEY,
      JSON.stringify(state.apis)
    );
  },

  setApiItemInitialized(state, uuid) {
    var currentScreenClass = getCurrentScreenClass();
    var apiLayout =
      state.apis[state.currentApiId].apiLayouts[currentScreenClass];
    var apiItem = apiLayout.find(item => item.uuid === uuid);

    apiItem.initialized = true;
  },

  setApiItemHeight(state, payload) {
    var currentScreenClass = getCurrentScreenClass();
    var apiLayout =
      state.apis[state.currentApiId].apiLayouts[currentScreenClass];
    var apiItem = apiLayout.find(item => item.uuid === payload.uuid);

    apiItem.h = payload.height;
  },

  setApiItemWidth(state, payload) {
    var currentScreenClass = getCurrentScreenClass();
    var apiLayout =
      state.apis[state.currentApiId].apiLayouts[currentScreenClass];
    var apiItem = apiLayout.find(item => item.uuid === payload.uuid);

    apiItem.w = payload.width;
  },

  setApiLayoutItems(state, layoutItems) {
    var currentScreenClass = getCurrentScreenClass();
    state.apis[state.currentApiId].apiLayouts[currentScreenClass] = layoutItems;
  },

  setApiLayoutCompacted(state) {
    var currentScreenClass = getCurrentScreenClass();

    state.apis[state.currentApiId].apiLayouts[
      currentScreenClass
    ].compacted = true;
  },

  setApiLayouts(state, layouts) {
    var currentApiLayouts = state.apis[state.currentApiId].apiLayouts;
    if (!currentApiLayouts) {
      state.apis[state.currentApiId].apiLayouts = layouts;
    } else {
      var screenClasses = Object.keys(layouts);
      screenClasses.forEach(screenClass => {
        currentApiLayouts[screenClass] = layouts[screenClass];
      });
    }
  }

  // removeForm(state, formId) {
  //   // TODO
  // }
};

const actions = {
  addNewApi({ commit }, apiModel) {
    commit(ADD_NEW_API, apiModel);
  },
  disableEditModeApiLayout({ commit }) {
    commit(DISABLE_EDIT_MODE_API_LAYOUT);
  },
  enableEditModeApiLayout({ commit }) {
    commit(ENABLE_EDIT_MODE_API_LAYOUT);
  },
  loadApis({ commit }) {
    commit(LOAD_APIS);
  },
  loadApiLayout({ commit }, apiId) {
    commit(LOAD_API_LAYOUT, apiId);
  },
  saveApiLayout({ commit }) {
    commit(SAVE_API_LAYOUT);
  },
  setApiLayouts({ commit }, layouts) {
    commit(SET_API_LAYOUTS, layouts);
  },
  setApiLayoutItems({ commit }, layoutItems) {
    commit(SET_API_LAYOUT_ITEMS, layoutItems);
    commit(SAVE_API_LAYOUT);
  },
  setApiItemInitialized({ commit }, uuid) {
    commit(SET_API_ITEM_INTIAILIZED, uuid);
  },
  setApiItemHeight({ commit }, payload) {
    commit(SET_API_ITEM_HEIGHT, payload);
  },
  setApiItemWidth({ commit }, payload) {
    commit(SET_API_ITEM_WIDTH, payload);
  },
  setApiLayoutCompacted({ commit }) {
    commit(SET_API_LAYOUT_COMPACTED);
    commit(SAVE_API_LAYOUT);
  },
  removeForm({ commit }, formId) {
    commit(REMOVE_FORM, formId);
  }
};

export default {
  state,
  mutations,
  actions
};
