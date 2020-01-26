<template>
  <grid-item
    :x="0"
    :y="0"
    :w="12"
    :h="2"
    :i="0"
    :key="0"
    :isDraggable="true"
    :isResizable="true"
    :static="false"
  >
    <nav
      class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end"
    >
      <button
        type="button"
        class="menu-item fa fa-bars fa-3x"
        title="Menu"
        @click.prevent="toggle"
      ></button>
      <div class="ml-auto mr-1"></div>
      <div
        class="collapse navbar-collapse flex-grow-0"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav text-right">
          <li class="nav-item">
            <button
              type="button"
              class="menu-item add-panel-button fa fa-plus fa-3x text-right"
              @click.prevent="addGridItem"
            ></button>
          </li>
          <li class="nav-item" v-if="!isEditModeEnabled">
            <button
              type="button"
              class="menu-item add-panel-button fa fa-pencil fa-3x text-right"
              @click.prevent="editGridLayout"
            ></button>
          </li>
          <li class="nav-item" v-if="isEditModeEnabled">
            <button
              type="button"
              class="menu-item add-panel-button fa fa-floppy-o fa-3x text-right"
              @click.prevent="saveLayout"
            ></button>
          </li>
        </ul>
      </div>
    </nav>
  </grid-item>
</template>

<script>
import { mapState } from "vuex";
import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  SAVE_LAYOUT,
  TOGGLE_NAV
} from "../../types/action-types";

export default {
  data() {
    return {
      isEditModeEnabled: false
    };
  },
  computed: {
    ...mapState({
      isNavOpen: state => state.menu.isNavOpen
    })
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
