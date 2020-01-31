<template>
  <div class="row menu-bar">
    <draggable tag="ul" class="menu-list col-xs-6 col-sm-4" v-model="menuItems">
      <li v-for="menuItem in menuItems" class="menu-item" :key="menuItem.order">
        <template v-if="menuItem.alignment === LEFT">
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-if="menuItem.type === ADD_GRID_ITEM_MENU_ITEM"
            v-on:click="addGridItem"
          ></button>
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-show="!isEditModeEnabled"
            v-else-if="menuItem.type === ENABLE_EDIT_MODE_MENU_ITEM"
            v-on:click="editGridLayout"
          ></button>
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-else-if="menuItem.type === HAMBURGER_MENU_ITEM"
            v-on:click="toggleNav"
          ></button>
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-show="isEditModeEnabled"
            v-if="menuItem.type === SAVE_MAIN_LAYOUT_MENU_ITEM"
            v-on:click="saveMainLayout"
          ></button>
        </template>
      </li>
    </draggable>
    <div class="placeholder hidden-xs col-sm-4"></div>
    <draggable tag="ul" class="menu-list col-xs-6 col-sm-4" v-model="menuItems">
      <li
        v-for="menuItem in menuItems"
        class="menu-item float-right"
        :key="menuItem.order"
      >
        <template v-if="menuItem.alignment === RIGHT">
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-if="menuItem.type === ADD_GRID_ITEM_MENU_ITEM"
            v-on:click="addGridItem"
          ></button>
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-show="!isEditModeEnabled"
            v-else-if="menuItem.type === ENABLE_EDIT_MODE_MENU_ITEM"
            v-on:click="editGridLayout"
          ></button>
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-else-if="menuItem.type === HAMBURGER_MENU_ITEM"
            v-on:click="toggleNav"
          ></button>
          <button
            type="button"
            class="menu-item fa fa-3x"
            :order="menuItem.order"
            :class="[menuItem.iconClass]"
            v-show="isEditModeEnabled"
            v-if="menuItem.type === SAVE_MAIN_LAYOUT_MENU_ITEM"
            v-on:click="saveMainLayout"
          ></button>
        </template>
      </li>
    </draggable>
  </div>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";

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
  components: {
    draggable
  },
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
      isNavOpen: state => state.menu.isNavOpen
    }),
    menuItems: {
      get() {
        return this.$store.state.menu.menuItems;
      },
      set(menuItems) {
        console.log(menuItems);
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
  padding-left: 10px;
  padding-right: 10px;
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
