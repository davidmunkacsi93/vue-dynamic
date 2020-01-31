<template>
  <draggable tag="ul" class="menu-list">
    <li v-for="menuItem in menuItems" class="menu-item" :key="menuItem.order">
      <button
        type="button"
        class="menu-item fa fa-plus fa-3x"
        @click.prevent="menuItem.clickHandler"
      ></button>
    </li>
  </draggable>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";

import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  INITIALIZE_MENU_ITEMS,
  SET_MENU_ITEMS,
  SAVE_MAIN_LAYOUT,
  TOGGLE_NAV
} from "../types/action-types";

export default {
  components: {
    draggable
  },
  data() {
    return {
      isEditModeEnabled: false
    };
  },
  beforeCreate() {
    this.$store.dispatch(INITIALIZE_MENU_ITEMS);
  },
  computed: {
    ...mapState({
      isNavOpen: state => state.menu.isNavOpen
    }),
    menuItems: {
      get() {
        console.log(this.$store.state.menu.menuItems);
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

.menu-list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
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
