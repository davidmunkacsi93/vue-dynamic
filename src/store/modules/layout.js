import EventBus from "../../utils/event-bus.js";
import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  LOAD_LAYOUT,
  SAVE_LAYOUT,
  SET_LAYOUT_ITEMS
} from "../../types/action-types";
import { FORM, MENU } from "../../types/layout-item-types";

const LOCAL_STORAGE_LAYOUT_KEY = "layout";

function getNextId(state) {
  if (!state.layoutItems || state.layoutItems.length === 0) return 0;

  const layoutItem = state.layoutItems.reduce((previous, current) =>
    previous.id > current.id ? previous : current
  );
  console.log(layoutItem.id);
  return layoutItem.id + 1;
}

const state = {
  layouts: [],
  layoutItems: []
};

const mutations = {
  addGridItem(state) {
    const newId = getNextId(state);
    const newItem = {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      i: newId.toString(),
      id: newId,
      isDraggable: true,
      isResizable: true,
      static: true,
      layoutItemType: FORM
    };
    state.layoutItems.push(newItem);
    EventBus.$emit("compact");
    EventBus.$emit("gridItemAdded");
  },
  enableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.static = false;
    }
  },
  disableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.static = true;
    }
  },
  loadLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_LAYOUT_KEY);
    if (!layoutString) {
      const menu = {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        i: "0",
        id: 0,
        isDraggable: true,
        isResizable: true,
        static: true,
        layoutItemType: MENU
      };
      state.layoutItems.push(menu);
    }

    const parsedLayout = JSON.parse(layoutString);
    state.layoutItems = parsedLayout;
  },
  saveLayout(state) {
    localStorage.setItem(
      LOCAL_STORAGE_LAYOUT_KEY,
      JSON.stringify(state.layoutItems)
    );
  },
  setLayoutItems(state, layoutItems) {
    state.layoutItems = layoutItems;
    console.log(state.layoutItems);
  }
};

const actions = {
  addGridItem({ commit }) {
    commit(ADD_GRID_ITEM);
  },
  disableEditMode({ commit }) {
    commit(DISABLE_EDIT_MODE);
  },
  enableEditMode({ commit }) {
    commit(ENABLE_EDIT_MODE);
  },
  loadLayout({ commit }) {
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
