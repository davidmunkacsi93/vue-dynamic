const LOCAL_STORAGE_LAYOUT_KEY = "layout";

function getNextId(state) {
  if (!state.layoutItems || state.layoutItems.length === 0) return 0;

  var newId = state.layoutItems.reduce((previous, current) =>
    previous.id > current.id ? previous.id : current.id
  );
  return ++newId;
}

const state = {
  layouts: [],
  layoutItems: []
};

const mutations = {
  addGridItem(state) {
    const newItem = {
      x: 0,
      y: 0,
      width: 2,
      height: 1,
      id: getNextId(state),
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
    const layoutString = localStorage.getItem(LOCAL_STORAGE_LAYOUT_KEY);
    
    if (!layoutString) return;

    const parsedLayout = JSON.parse(layoutString);
    console.log(parsedLayout);
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
