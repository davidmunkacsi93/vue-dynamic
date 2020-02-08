import EventBus from "../../utils/event-bus.js";
import {
  ADD_NEW_FORM,
  LOAD_API_LAYOUT,
  SET_CURRENT_API_ID,
  REMOVE_FORM,
  SET_API_LAYOUT_ITEMS
} from "../../types/action-types";
import { FORM } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";

function getNextId() {
  if (!state.apis || state.apis.length === 0) return 0;
  const currentLayout = state.apis.filter(
    layout => layout.apiId == state.currentApiId
  );
  if (!currentLayout) return 0;
  const layoutItemWithGreatestId = currentLayout.reduce((previous, current) =>
    previous.id > current.id ? previous : current
  );
  return layoutItemWithGreatestId.id + 1;
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

function getDummyData() {
  return [
    {
      apiId: 0,
      apiName: "First API",
      apiPath: "/api/0",
      layout: [
        {
          x: 3,
          y: 2,
          w: 2,
          h: 13,
          i: 0,
          id: 0,
          isDraggable: true,
          isResizable: true,
          static: false,
          layoutItemType: FORM
        },
        {
          x: 5,
          y: 2,
          w: 2,
          h: 13,
          i: 0,
          id: 1,
          isDraggable: true,
          isResizable: true,
          static: false,
          layoutItemType: FORM
        }
      ]
    },
    {
      apiId: 1,
      apiName: "Second API",
      apiPath: "/api/1",
      layout: [
        {
          x: 3,
          y: 2,
          w: 4,
          h: 13,
          i: 0,
          id: 0,
          isDraggable: true,
          isResizable: true,
          static: false,
          layoutItemType: FORM
        },
        {
          x: 5,
          y: 2,
          w: 4,
          h: 13,
          i: 0,
          id: 1,
          isDraggable: true,
          isResizable: true,
          static: false,
          layoutItemType: FORM
        }
      ]
    }
  ];
}

const state = {
  currentApiId: -1,
  currentApiMetaData: null,
  isEditModeActive: true,
  apis: getDummyData()
};

const mutations = {
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
    state.layoutItems.push(newItem);
    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
  },

  loadApiLayout(state, apiId) {
    state.currentApiMetaData = state.apis.find(api => api.apiId == apiId);
    EventBus.$emit(LAYOUT_UPDATED);
  },

  setApiLayoutItems(state, layoutItems) {
    state.currentApiMetaData.layout = layoutItems;
  },

  setCurrentApiId(state, apiId) {
    state.currentApiId = apiId;
  },

  removeForm(state, formId) {
    state.mainLayoutItems = state.mainLayoutItems.filter(
      item => item.id != formId
    );
    EventBus.$emit(LAYOUT_UPDATED);
  }
};

const actions = {
  addNewForm({ commit }) {
    commit(ADD_NEW_FORM);
  },
  loadApiLayout({ commit }, apiId) {
    commit(LOAD_API_LAYOUT, apiId);
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
