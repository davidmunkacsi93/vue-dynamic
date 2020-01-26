import { TOGGLE_NAV } from "../../types/action-types";

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
    commit(TOGGLE_NAV);
  }
};

export default {
  state,
  mutations,
  actions
};
