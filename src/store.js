import Vuex from "vuex";

export const store = Vuex.Store({
  state: {
    isNavOpen: false
  },
  mutations: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    }
  }
});
