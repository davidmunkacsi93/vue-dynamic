import EventBus from "../../utils/event-bus.js";

const LOCAL_STORAGE_LAYOUT_KEY = "layout";

function getNextId(state) {
  if (!state.layoutItems || state.layoutItems.length === 0) return 0;

  const layoutItem = state.layoutItems.reduce((previous, current) =>
    previous.id > current.id ? previous : current
  );
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
      x: 1,
      y: 1,
      width: 2,
      height: 1,
      id: newId,
      isDraggable: false,
      isResizable: false
    };
    state.layoutItems.push(newItem);
    EventBus.$emit("initializeComponent");
  },
  enableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.isResizable = true;
      layoutItem.isDraggable = true;
    }
  },
  disableEditMode(state) {
    for (var layoutItem of state.layoutItems) {
      layoutItem.isResizable = false;
      layoutItem.isDraggable = false;
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
  }
};

export default {
  state,
  mutations,
  actions
};
