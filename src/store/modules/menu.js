import {
  INITIALIZE_MENU_ITEMS,
  LOAD_MENU,
  SAVE_MENU,
  SET_MENU_ITEMS,
  TOGGLE_NAV
} from "../../types/action-types";

const LOCAL_STORAGE_MENU_KEY = "menu";

const state = {
  isNavOpen: false,
  menuItems: []
};

const mutations = {
  initializeMenuItems(state) {
    if (state.menuItems && state.menuItems.length > 0) return;

    const hamburgerMenuItem = {
      clickHandler: TOGGLE_NAV,
      icon: "fa-bars",
      order: 0
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

    localStorage.setItem(
      LOCAL_STORAGE_MENU_KEY,
      JSON.stringify(state.menuItems)
    );
  },
  loadMenu() {
    const menuString = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
    console.log(menuString);
    if (!menuString) {
      return;
    }

    const parsedLayout = JSON.parse(menuString);
    state.menuItems = parsedLayout;
  },
  saveMenu() {
    localStorage.setItem(
      LOCAL_STORAGE_MENU_KEY,
      JSON.stringify(state.menuItems)
    );
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
  loadMenu({ commit }) {
    commit(INITIALIZE_MENU_ITEMS);
    commit(LOAD_MENU);
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
