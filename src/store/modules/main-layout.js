import EventBus from "../../utils/event-bus.js";
import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  INITIALIZE_MENU,
  LOAD_MAIN_LAYOUT,
  SAVE_MAIN_LAYOUT,
  SET_MAIN_LAYOUT_ITEMS,
  REMOVE_GRID_ITEM
} from "../../types/action-types";
import { FORM, MENU, SIDEBAR } from "../../types/layout-item-types";
import { COMPACT, LAYOUT_UPDATED } from "../../types/event-types";

const LOCAL_STORAGE_MAIN_LAYOUT_KEY = "main-layout";

const state = {
  isEditModeActive: false,
  layouts: [],
  layoutItems: []
};

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

const mutations = {
  addGridItem(state) {
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
    if (layoutString) return;

    const menu = {
      x: 2,
      y: 0,
      w: 10,
      h: 2,
      i: "0",
      id: 0,
      isDraggable: true,
      isResizable: true,
      static: true,
      layoutItemType: MENU
    };

    const sidebar = {
      x: 0,
      y: 0,
      w: 2,
      h: 20,
      i: "1",
      id: 1,
      isDraggable: true,
      isResizable: true,
      static: true,
      layoutItemType: SIDEBAR
    };

    state.layoutItems.push(menu);
    state.layoutItems.push(sidebar);

    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUT_KEY,
      JSON.stringify(state.layoutItems)
    );
  },
  loadMainLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_MAIN_LAYOUT_KEY);
    if (!layoutString) {
      return;
    }

    const parsedLayout = JSON.parse(layoutString);
    state.layoutItems = parsedLayout;
    EventBus.$emit(LAYOUT_UPDATED);
    EventBus.$emit(COMPACT);
  },
  saveMainLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_MAIN_LAYOUT_KEY,
      JSON.stringify(state.layoutItems)
    );
  },
  setMainLayoutItems(state, layoutItems) {
    state.layoutItems = layoutItems;
    EventBus.$emit(LAYOUT_UPDATED);
  },
  removeGridItem(state, itemId) {
    state.layoutItems = state.layoutItems.filter(item => item.id != itemId);
    EventBus.$emit(LAYOUT_UPDATED);
  }
};

const actions = {
  addGridItem({ commit }) {
    commit(ADD_GRID_ITEM);
    commit(SAVE_MAIN_LAYOUT);
  },
  disableEditMode({ commit }) {
    commit(DISABLE_EDIT_MODE);
  },
  enableEditMode({ commit }) {
    commit(ENABLE_EDIT_MODE);
  },
  loadMainLayout({ commit }) {
    commit(INITIALIZE_MENU);
    commit(LOAD_MAIN_LAYOUT);
  },
  saveMainLayout({ commit }) {
    commit(SAVE_MAIN_LAYOUT);
  },
  setMainLayoutItems({ commit }, layoutItems) {
    commit(SET_MAIN_LAYOUT_ITEMS, layoutItems);
  },
  removeGridItem({ commit }, itemId) {
    commit(REMOVE_GRID_ITEM, itemId);
    commit(SAVE_MAIN_LAYOUT);
  }
};

export default {
  state,
  mutations,
  actions
};
