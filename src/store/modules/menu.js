import {
  INITIALIZE_MENU_ITEMS,
  SET_MENU_ITEMS,
  TOGGLE_NAV
} from "../../types/action-types";

const state = {
  isNavOpen: false,
  menuItems: null
};

const mutations = {
  initializeMenuItems(state) {
    if (state.menuItems) return;

    const hamburgerMenuItem = {
      icon: "fa-bars",
      clickHandler: TOGGLE_NAV
    };
    const addGridItemMenuItem = {
      icon: "fa-plus"
    };
    const editMainLayoutMenuItem = {
      icon: "fa-bars"
    };
    const saveMainLayoutMenuItem = {
      icon: "fa-plus"
    };

    state.menuItems.push(hamburgerMenuItem);
    state.menuItems.push(addGridItemMenuItem);
    state.menuItems.push(editMainLayoutMenuItem);
    state.menuItems.push(saveMainLayoutMenuItem);
  },
  setMenuItems(state, menuItems) {
    state.menuItems = menuItems;
  },
  toggleNav(state) {
    state.isNavOpen = !state.isNavOpen;
  }
};

const actions = {
  initializeMenuItems({ commit }) {
    commit(INITIALIZE_MENU_ITEMS);
  },
  setMenuLayoutItems({ commit }, layoutItems) {
    commit(SET_MENU_ITEMS, layoutItems);
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
