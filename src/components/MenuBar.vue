<template>
  <ul class="menu-list" v-drag-and-drop:options="dragAndDropOptions">
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
  </ul>
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
      isEditModeEnabled: false,
      dragAndDropOptions: {
        dropzoneSelector: "ul",
        draggableSelector: "li",
        handlerSelector: null,
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDrop: function(event) {},
        onDragstart: function(event) {},
        onDragenter: function(event) {},
        onDragover: function(event) {},
        onDragend: function(event) {}
      }
    };
  },
  computed: {
    ...mapState({
      isNavOpen: state => state.menu.isNavOpen
    }),
    menuLayoutItems: {
      get() {
        return this.$store.state.layout.menuLayoutItems;
      },
      set() {
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
