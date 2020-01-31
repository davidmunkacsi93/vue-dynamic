import {
  SET_MENU_LAYOUT_ITEMS,
  TOGGLE_NAV
} from "../../types/action-types";

const state = {
  isNavOpen: false
};

const mutations = {
  setMenuLayoutItems(state, menuLayoutItems) {
    state.menuLayoutItems = menuLayoutItems;
  },
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  }
};

const actions = {
  setMenuLayoutItems({ commit }, layoutItems) {
    commit(SET_MENU_LAYOUT_ITEMS, layoutItems);
  },
  toggleNav({ commit }) {
    commit(TOGGLE_NAV);
  }
};

export default {
  state,
  mutations,
  actions
};
