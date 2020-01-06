const state = {
  isNavOpen: false
};

const mutations = {
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  }
};

const actions = {
  toggleNav({ commit }) {
    commit("toggleNav");
  }
};

export default {
  state,
  mutations,
  actions
};
