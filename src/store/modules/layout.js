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
      draggable: true
    };
    state.layoutItems.push(newItem);
  }
};

const actions = {
  addGridItem({ commit }) {
    commit("addGridItem");
  }
};

export default {
  state,
  mutations,
  actions
};
