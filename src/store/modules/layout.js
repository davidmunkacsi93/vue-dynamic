const defaultItems = [
  { x: 0, y: 0, width: 2, height: 1, id: 0, draggable: true },
  { x: 200, y: 200, width: 2, height: 1, id: 1, draggable: true },
  { x: 400, y: 400, width: 4, height: 1, id: 2, draggable: true },
  { x: 600, y: 600, width: 6, height: 1, id: 3, draggable: true }
];

const state = {
  layouts: [],
  layoutItems: defaultItems
};

const mutations = {
  addItem(state, item) {
    state.items.push(item);
  }
};

const actions = {
  addItem({ commit }, item) {
    commit("addGridItem", item);
  }
};

export default {
  state,
  mutations,
  actions
};
