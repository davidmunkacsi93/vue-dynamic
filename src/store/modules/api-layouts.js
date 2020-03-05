import EventBus from "../../utils/event-bus.js";
import {
  LOAD_API_LAYOUT,
  REMOVE_FORM,
  SET_API_LAYOUT_ITEMS,
  SAVE_API_LAYOUT,
  LOAD_APIS,
  ADD_NEW_API,
  DISABLE_EDIT_MODE_API_LAYOUT,
  ENABLE_EDIT_MODE_API_LAYOUT
} from "../../types/action-types";
import { COMPACT, LAYOUT_UPDATED, UPDATE_WIDTH } from "../../types/event-types";

const LOCAL_STORAGE_API_LAYOUT_KEY = "api-layout";

function getNextId() {
  if (!state.apis || state.apis.length === 0) return 0;

  const apiWithHighestId = state.apis.reduce((previous, current) =>
    previous.apiId > current.apiId ? previous : current
  );
  return apiWithHighestId.apiId + 1;
}

const state = {
  currentApiId: 0,
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
    for (var layoutItem of state.apis[state.currentApiId].apiLayout) {
      layoutItem.static = true;
    }
    state.isEditModeActive = false;
  },

  enableEditModeApiLayout(state) {
    for (var layoutItem of state.apis[state.currentApiId].apiLayout) {
      layoutItem.static = false;
    }
    state.isEditModeActive = true;
  },

  loadApis(state) {
    const apiString = localStorage.getItem(LOCAL_STORAGE_API_LAYOUT_KEY);
    if (!apiString) {
      return;
    }
    const parsedApis = JSON.parse(apiString);
    state.apis = parsedApis;
    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
  },

  loadApiLayout(state, apiId) {
    state.currentApiId = apiId;
    EventBus.$emit(COMPACT);
    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(UPDATE_WIDTH);
  },

  saveApiLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_API_LAYOUT_KEY,
      JSON.stringify(state.apis)
    );
  },

  setApiLayoutItems(state, layoutItems) {
    state.apis[state.currentApiId].apiLayout = layoutItems;
  },

  removeForm(state, formId) {
    // TODO
  }
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
  setApiLayoutItems({ commit }, layoutItems) {
    commit(SET_API_LAYOUT_ITEMS, layoutItems);
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
