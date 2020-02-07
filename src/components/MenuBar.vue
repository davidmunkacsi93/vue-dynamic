<template>
  <md-toolbar class="menu-bar md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
      </div>
      <h3 class="md-title">VueGenericUI</h3>

      <div class="md-toolbar-section-end">
        <md-button v-on:click="addGridItem" class="md-icon-button">
          <md-icon>add</md-icon>
        </md-button>
        <md-button
          v-on:click="editGridLayout"
          v-show="!isEditModeEnabled"
          class="md-icon-button"
        >
          <md-icon>edit</md-icon>
        </md-button>
        <md-button
          v-on:click="saveMainLayout"
          v-show="isEditModeEnabled"
          class="md-icon-button"
        >
          <md-icon>save</md-icon>
        </md-button>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapState } from "vuex";

import {
  ADD_GRID_ITEM,
  DISABLE_EDIT_MODE,
  ENABLE_EDIT_MODE,
  SAVE_MAIN_LAYOUT
} from "../types/action-types";

export default {
  data() {
    return {
      isEditModeEnabled: false
    };
  },
  computed: {
    ...mapState({
      isEditModeActive: state => state.mainLayout.isEditModeActive
    })
  },
  methods: {
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
  },
  props: {
    type: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.menu-bar {
  height: 100%;
}
</style>
