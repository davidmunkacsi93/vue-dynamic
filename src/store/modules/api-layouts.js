import EventBus from "../../utils/event-bus.js";
import {
  ADD_NEW_FORM,
  LOAD_API_LAYOUT,
  SET_CURRENT_API_ID,
  REMOVE_FORM,
  SET_API_LAYOUT_ITEMS,
  SAVE_API_LAYOUT,
  LOAD_APIS,
  ADD_NEW_API
} from "../../types/action-types";
import { FORM } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";

const LOCAL_STORAGE_API_LAYOUT_KEY = "api-layout";

function getNextId() {
  if (!state.apis || state.apis.length === 0) return 0;

  const apiWithHighestId = state.apis.reduce((previous, current) =>
    previous.apiId > current.apiId ? previous : current
  );
  return apiWithHighestId.apiId + 1;
}

function getNextFreePosition() {
  const x = Math.max.apply(
    Math,
    state.layoutItems.map(function(layoutItem) {
      return layoutItem.y + layoutItem.h;
    })
  );
  const y = Math.max.apply(
    Math,
    state.layoutItems.map(function(layoutItem) {
      return layoutItem.y + layoutItem.h;
    })
  );
  return { x, y };
}

const state = {
  currentApiId: -1,
  currentApiLayout: [],
  currentApiModel: {},
  isEditModeActive: true,
  apis: []
};

const mutations = {
  addNewApi(state, apiModel) {
    apiModel.apiId = getNextId();
    apiModel.apiPath = "/api/" + apiModel.apiId;
    state.apis.push(apiModel);
  },

  addNewForm(state) {
    const newId = getNextId();
    const position = getNextFreePosition();
    const newItem = {
      x: position.x,
      y: position.y,
      w: 2,
      h: 13,
      i: newId.toString(),
      id: newId,
      isDraggable: true,
      isResizable: true,
      static: !state.isEditModeActive,
      layoutItemType: FORM
    };
    state.currentApiLayout.push(newItem);
    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
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
    state.currentApiModel = state.apis.find(api => api.apiId == apiId);
    state.currentApiLayout = state.currentApiModel.apiLayout;
    EventBus.$emit(LAYOUT_UPDATED);
  },

  saveApiLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_API_LAYOUT_KEY,
      JSON.stringify(state.apis)
    );
  },

  setApiLayoutItems(state, layoutItems) {
    state.curretApiModel.apiLayout = layoutItems;
    state.currentApiLayout = layoutItems;
  },

  setCurrentApiId(state, apiId) {
    state.currentApiId = apiId;
  },

  removeForm(state, formId) {
    state.currentApiLayout = state.currentApiLayout.filter(
      item => item.id != formId
    );
    EventBus.$emit(LAYOUT_UPDATED);
  }
};

const actions = {
  addNewApi({ commit }, apiModel) {
    commit(ADD_NEW_API, apiModel);
    commit(SAVE_API_LAYOUT);
  },
  addNewForm({ commit }) {
    commit(ADD_NEW_FORM);
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
  setCurrentApiId({ commit }, apiId) {
    commit(SET_CURRENT_API_ID, apiId);
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
