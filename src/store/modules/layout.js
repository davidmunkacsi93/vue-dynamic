const LOCAL_STORAGE_LAYOUT_KEY = "layout";

const state = {
  layouts: [],
  layoutItems: []
};

const mutations = {
  addGridItem(state) {
    var newId = state.layoutItems.reduce((previous, current) =>
      previous.id > current.id ? previous.id : current.id
    );
    const newItem = {
      x: 0,
      y: 0,
      width: 2,
      height: 1,
      id: ++newId,
      isDraggable: false,
      isResizable: false
    };
    state.layoutItems.push(newItem);
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
    const layoutString = localStorage.get(LOCAL_STORAGE_LAYOUT_KEY);
    const parsedLayout = JSON.parse(layoutString);
    console.log(parsedLayout);
    state.layoutItems = parsedLayout;
  },
  saveLayout(state) {
    localStorage.setItem(LOCAL_STORAGE_LAYOUT_KEY, JSON.stringify(state.layoutItems));
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
