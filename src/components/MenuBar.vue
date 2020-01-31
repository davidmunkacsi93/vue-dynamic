<template>
  <draggable tag="ul" class="menu-list">
    <li class="menu-item">
      <button
        type="button"
        class="menu-item fa fa-bars fa-3x"
        title="Menu"
        @click.prevent="toggle"
      ></button>
    </li>
    <li class="menu-item">
      <button
        type="button"
        class="menu-item fa fa-plus fa-3x"
        @click.prevent="addGridItem"
      ></button>
    </li>
    <li class="menu-item">
      <button
        v-if="!isEditModeEnabled"
        type="button"
        class="menu-item fa fa-pencil fa-3x"
        @click.prevent="editGridLayout"
      ></button>
      <button
        v-if="isEditModeEnabled"
        type="button"
        class="menu-item fa fa-floppy-o fa-3x"
        @click.prevent="saveLayout"
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
  SET_MENU_ITEMS,
  SAVE_LAYOUT,
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
  computed: {
    ...mapState({
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
    saveLayout() {
      this.$store.dispatch(DISABLE_EDIT_MODE);
      this.isEditModeEnabled = false;
      this.$store.dispatch(SAVE_LAYOUT);
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
