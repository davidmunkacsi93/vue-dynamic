import EventBus from "../../utils/event-bus.js";
import {
  ADD_NEW_FORM,
  REMOVE_FORM,
  SET_CURRENT_API_ID
} from "../../types/action-types";
import { FORM } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";

function getNextId() {
  if (!state.apiLayouts || state.apiLayouts.length === 0) return 0;
  const currentLayout = state.apiLayouts.filter(
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
  currentLayout: [],
  isEditModeActive: true,
  apiLayouts: getDummyData()
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
