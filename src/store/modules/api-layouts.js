import EventBus from "../../utils/event-bus.js";
import { ADD_NEW_FORM, REMOVE_FORM } from "../../types/action-types";
import { FORM } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";

function getNextId() {
  if (!state.layoutItems || state.layoutItems.length === 0) return 0;
  console.log(state.layoutItems);
  const layoutItem = state.layoutItems.reduce((previous, current) =>
    previous.id > current.id ? previous : current
  );
  return layoutItem.id + 1;
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
  apiLayouts: []
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
  removeForm({ commit }, formId) {
    commit(REMOVE_FORM, formId);
  }
};

export default {
  state,
  mutations,
  actions
};
