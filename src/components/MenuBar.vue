<template>
  <grid-layout
    :layout.sync="menuLayoutItems"
    :col-num="24"
    :row-height="30"
    :margin="[0, 0]"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :responsive="true"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      :x="0"
      :y="0"
      :w="1"
      :h="1"
      :i="100"
      :isDraggable="true"
      :isResizable="false"
      :static="false"
    >
      <button
        type="button"
        class="menu-item fa fa-bars fa-3x"
        title="Menu"
        @click.prevent="toggle"
      ></button>
    </grid-item>
    <grid-item
      :x="0"
      :y="0"
      :w="1"
      :h="1"
      :i="100"
      :isDraggable="true"
      :isResizable="false"
      :static="false"
    >
      <button
        type="button"
        class="menu-item fa fa-bars fa-3x"
        title="Menu"
        @click.prevent="toggle"
      ></button>
    </grid-item>
    <grid-item
      :x="1"
      :y="0"
      :w="1"
      :h="1"
      :i="100"
      :isDraggable="true"
      :isResizable="false"
      :static="false"
    >
      <button
        type="button"
        class="menu-item fa fa-plus fa-3x"
        @click.prevent="addGridItem"
      ></button>
    </grid-item>
    <grid-item
      :x="2"
      :y="0"
      :w="1"
      :h="1"
      :i="100"
      :isDraggable="true"
      :isResizable="false"
      :static="false"
    >
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
    </grid-item>
  </grid-layout>
</template>

<script>
import { mapState } from "vuex";
import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  SAVE_LAYOUT,
  SET_MENU_LAYOUT_ITEMS,
  TOGGLE_NAV
} from "../types/action-types";

export default {
  data() {
    return {
      isEditModeEnabled: false
    };
  },
  computed: {
    ...mapState({
      isNavOpen: state => state.menu.isNavOpen
    }),
    menuLayoutItems: {
      get: function() {
        return this.$store.state.layout.menuLayoutItems;
      },
      set: function(menuLayoutItems) {
        this.$store.dispatch(SET_MENU_LAYOUT_ITEMS, menuLayoutItems);
      }
    }
  },
  methods: {
    toggle() {
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

/* remove blue outline */
button:focus {
  outline: 0;
}

.menu-item {
  color: white;
  display: inline;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
}

.add-grid-item-button {
  float: right !important;
  right: 0;
}
</style>
