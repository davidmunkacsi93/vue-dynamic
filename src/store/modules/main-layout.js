import EventBus from "../../utils/event-bus.js";
import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  INITIALIZE_MENU,
  LOAD_LAYOUT,
  SAVE_LAYOUT,
  SET_LAYOUT_ITEMS
} from "../../types/action-types";
import { FORM, MENU } from "../../types/layout-item-types";

const LOCAL_STORAGE_MAIN_LAYOUT_KEY = "layout";

const state = {
  isEditModeActive: false,
  layouts: [],
  layoutItems: [],
  menuLayoutItems: []
};

function getNextId() {
  if (!state.layoutItems || state.layoutItems.length === 0) return 0;

  const layoutItem = state.layoutItems.reduce((previous, current) =>
    previous.id > current.id ? previous : current
  );
  return layoutItem.id + 1;
}

function getBottom() {
  return Math.max.apply(
    Math,
    state.layoutItems.map(function(layoutItem) {
      return layoutItem.y + layoutItem.h;
    })
  );
}

const mutations = {
  addGridItem(state) {
    const newId = getNextId();
    const bottom = getBottom();
    const newItem = {
      x: 0,
      y: bottom,
      w: 2,
      h: 2,
      i: newId.toString(),
      id: newId,
      isDraggable: true,
      isResizable: true,
      static: !state.isEditModeActive,
      layoutItemType: FORM
    };
    state.layoutItems.push(newItem);
    EventBus.$emit("layoutUpdated");
    EventBus.$emit("compact");
  },
  enableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.static = false;
    }

    state.isEditModeActive = true;
  },
  disableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.static = true;
    }

    state.isEditModeActive = false;
  },
  initializeMenu(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUT_KEY);
    if (layoutString) {
      return;
    }

    const menu = {
      x: 0,
      y: 0,
      w: 12,
      h: 2,
      i: "0",
      id: 0,
      isDraggable: true,
      isResizable: true,
      static: true,
      layoutItemType: MENU
    };

    state.layoutItems.push(menu);
    return;
  },
  loadLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUT_KEY);
    if (!layoutString) {
      return;
    }

    const parsedLayout = JSON.parse(layoutString);
    state.layoutItems = parsedLayout;
    EventBus.$emit("layoutUpdated");
    EventBus.$emit("compact");
  },
  saveLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUT_KEY,
      JSON.stringify(state.layoutItems)
    );
  },
  setLayoutItems(state, layoutItems) {
    state.layoutItems = layoutItems;
    EventBus.$emit("layoutUpdated");
  }
};

const actions = {
  addGridItem({ commit }) {
    commit(ADD_GRID_ITEM);
    commit(SAVE_LAYOUT);
  },
  disableEditMode({ commit }) {
    commit(DISABLE_EDIT_MODE);
  },
  enableEditMode({ commit }) {
    commit(ENABLE_EDIT_MODE);
  },
  loadLayout({ commit }) {
    commit(INITIALIZE_MENU);
    commit(LOAD_LAYOUT);
  },
  saveLayout({ commit }) {
    commit(SAVE_LAYOUT);
  },
  setLayoutItems({ commit }, layoutItems) {
    commit(SET_LAYOUT_ITEMS, layoutItems);
  }
};

export default {
  state,
  mutations,
  actions
};
