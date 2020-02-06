<template>
  <md-toolbar>
    <span>VueGenericUI</span>
    <md-button v-on:click="toggleNav">
      <md-icon>menu</md-icon>
    </md-button>
    <md-button v-on:click="addGridItem">
      <md-icon>add</md-icon>
    </md-button>
    <md-button v-on:click="editGridLayout" v-show="!isEditModeEnabled">
      <md-icon>edit</md-icon>
    </md-button>
    <md-button v-on:click="saveMainLayout" v-show="isEditModeEnabled">
      <md-icon>save</md-icon>
    </md-button>
  </md-toolbar>
</template>

<script>
import { mapState } from "vuex";

import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  LOAD_MENU,
  SET_MENU_ITEMS,
  SAVE_MAIN_LAYOUT,
  TOGGLE_NAV
} from "../types/action-types";

import {
  ADD_GRID_ITEM_MENU_ITEM,
  ENABLE_EDIT_MODE_MENU_ITEM,
  HAMBURGER_MENU_ITEM,
  SAVE_MAIN_LAYOUT_MENU_ITEM
} from "../types/menu-item-types";

import { LEFT, RIGHT } from "../types/alignment-types";

export default {
  data() {
    return {
      isEditModeEnabled: false,

      ADD_GRID_ITEM_MENU_ITEM,
      ENABLE_EDIT_MODE_MENU_ITEM,
      HAMBURGER_MENU_ITEM,
      SAVE_MAIN_LAYOUT_MENU_ITEM,

      LEFT,
      RIGHT
    };
  },
  beforeCreate() {
    this.$store.dispatch(LOAD_MENU);
  },
  computed: {
    ...mapState({
      isEditModeActive: state => state.mainLayout.isEditModeActive,
      isNavOpen: state => state.menu.isNavOpen
    }),
    menuItems: {
      get() {
        return this.$store.state.menu.menuItems;
      },
      set(menuItems) {
        this.$store.dispatch(SET_MENU_ITEMS, menuItems);
      }
    }
  },
  methods: {
    toggleNav() {
      this.$store.dispatch(TOGGLE_NAV);
    },
    addGridItem() {
      this.$store.dispatch(ADD_GRID_ITEM);
    },
    editGridLayout() {
      this.$store.dispatch(ENABLE_EDIT_MODE);
      this.isEditModeEnabled = true;
    },
    saveMainLayout() {
      this.$store.dispatch(DISABLE_EDIT_MODE);
      this.isEditModeEnabled = false;
      this.$store.dispatch(SAVE_MAIN_LAYOUT);
    }
  }
};
</script>

<style>
.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

button:focus {
  outline: 0;
}

.placeholder {
  display: inline;
}

.menu-bar {
  background-color: #333333;
}

.menu-list {
  display: inline;
  list-style-type: none;
  margin: 0;
  overflow: hidden;
}

.menu-item {
  color: white;
  display: inline;
  border: 0;
  border-radius: 0;
  background-color: transparent;
}

.menu-item button {
  display: inline;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.add-grid-item-button {
  float: right !important;
  right: 0;
}
</style>
