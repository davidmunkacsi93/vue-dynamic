import {
  INITIALIZE_MENU_ITEMS,
  LOAD_MENU,
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
      iconClass: "fa-bars",
      order: 0
    };
    const addGridItemMenuItem = {
      clickHandler: TOGGLE_NAV,
      iconClass: "fa-plus",
      order: 1
    };
    const editMainLayoutMenuItem = {
      clickHandler: TOGGLE_NAV,
      iconClass: "fa-pencil",
      order: 2
    };
    const saveMainLayoutMenuItem = {
      clickHandler: TOGGLE_NAV,
      iconClass: "fa-floppy-o",
      order: 3
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
    state.menuItems = menuItems.map((item, index) => {
      item.order = index;
      return item;
    });
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
  setMenuItems({ commit }, menuItems) {
    commit(SET_MENU_ITEMS, menuItems);
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
