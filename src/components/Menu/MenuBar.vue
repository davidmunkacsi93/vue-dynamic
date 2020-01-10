<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
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
        <li class="nav-item" v-if="!isEditModeActive">
          <button
            type="button"
            class="menu-item add-panel-button fa fa-pencil fa-3x text-right"
            @click.prevent="editGridLayout"
          ></button>
        </li>
        <li class="nav-item" v-if="isEditModeActive">
          <button
            type="button"
            class="menu-item add-panel-button fa fa-floppy-o fa-3x text-right"
            @click.prevent="saveLayout"
          ></button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isEditModeActive: false
    }
  },
  computed: {
    ...mapState({
      isNavOpen: state => state.menu.isNavOpen
    })
  },
  methods: {
    toggle() {
      this.$store.dispatch("toggleNav");
    },
    addGridItem() {
      this.$store.dispatch("addGridItem");
    },
    editGridLayout() {
      this.isEditModeActive = true;
    },
    saveLayout() {
      this.isEditModeActive = false;
      console.log("Saving current layout...");
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
