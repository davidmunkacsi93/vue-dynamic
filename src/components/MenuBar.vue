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
        <md-menu md-size="big" md-direction="bottom-end">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="addGridItem">
              <span>Add New Form</span>
              <md-icon>add</md-icon>
            </md-menu-item>
            <md-menu-item @click="editGridLayout" v-show="!isEditModeEnabled">
              <span>Edit Layout</span>
              <md-icon>edit</md-icon>
            </md-menu-item>
            <md-menu-item @click="saveMainLayout" v-show="isEditModeEnabled">
              <span>Save Layout</span>
              <md-icon>save</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapState } from "vuex";

import {
  ADD_NEW_FORM,
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
      this.$store.dispatch(ADD_NEW_FORM);
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
