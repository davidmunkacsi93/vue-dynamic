import EventBus from "../../utils/event-bus.js";

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
      static: true
    };
    state.layoutItems.push(newItem);
    EventBus.$emit("compact");
    EventBus.$emit("gridItemAdded");
  },
  enableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.static = true;
    }
  },
  disableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.static = true;
    }
  },
  loadLayout(state) {
    const layoutString = localStorage.getItem(LOCAL_STORAGE_LAYOUT_KEY);
    if (!layoutString) return;

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
    commit("addGridItem");
  },
  enableEditMode({ commit }) {
    commit("enableEditMode");
  },
  disableEditMode({ commit }) {
    commit("disableEditMode");
  },
  loadLayout({ commit }) {
    commit("loadLayout");
  },
  saveLayout({ commit }) {
    commit("saveLayout");
  },
  setLayoutItems({ commit }, layoutItems) {
    commit("setLayoutItems", layoutItems);
  }
};

export default {
  state,
  mutations,
  actions
};
