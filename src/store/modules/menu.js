import {
  INITIALIZE_MENU_ITEMS,
  LOAD_MENU,
  SET_MENU_ITEMS,
  TOGGLE_NAV
} from "../../types/action-types";

import {
  ADD_GRID_ITEM_MENU_ITEM,
  ENABLE_EDIT_MODE_MENU_ITEM,
  HAMBURGER_MENU_ITEM,
  SAVE_MAIN_LAYOUT_MENU_ITEM
} from "../../types/menu-item-types";

import { LEFT, RIGHT } from "../../types/alignment-types";

const LOCAL_STORAGE_MENU_KEY = "menu";

const state = {
  isNavOpen: false,
  menuItems: []
};

const mutations = {
  initializeMenuItems(state) {
    if (state.menuItems && state.menuItems.length > 0) return;

    const hamburgerMenuItem = {
      alignment: LEFT,
      iconClass: "fa-bars",
      type: HAMBURGER_MENU_ITEM,
      order: 0
    };
    const addGridItemMenuItem = {
      alignment: RIGHT,
      iconClass: "fa-plus",
      type: ADD_GRID_ITEM_MENU_ITEM,
      order: 1
    };
    const enableEditModeMenuItem = {
      alignment: RIGHT,
      iconClass: "fa-pencil",
      type: ENABLE_EDIT_MODE_MENU_ITEM,
      order: 2
    };
    const saveMainLayoutMenuItem = {
      alignment: RIGHT,
      iconClass: "fa-floppy-o",
      type: SAVE_MAIN_LAYOUT_MENU_ITEM,
      order: 3
    };

    state.menuItems.push(hamburgerMenuItem);
    state.menuItems.push(addGridItemMenuItem);
    state.menuItems.push(enableEditModeMenuItem);
    state.menuItems.push(saveMainLayoutMenuItem);

    localStorage.setItem(
      LOCAL_STORAGE_MENU_KEY,
      JSON.stringify(state.menuItems)
    );
  },
  loadMenu() {
    const menuString = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
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
