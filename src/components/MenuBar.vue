<template>
  <md-toolbar class="menu-bar md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <md-button class="md-icon-button" @click="onMenuClick">
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
            <md-menu-item
              @click="editApiLayout"
              v-show="$route.name === API_ROUTE_NAME && !isApiLayoutEditable"
            >
              <span>Edit API Layout</span>
              <md-icon>edit</md-icon>
            </md-menu-item>
            <md-menu-item
              @click="saveApiLayout"
              v-show="$route.name === API_ROUTE_NAME && isApiLayoutEditable"
            >
              <span>Save API Layout</span>
              <md-icon>save</md-icon>
            </md-menu-item>
            <md-menu-item
              @click="editMainLayout"
              v-show="!isMainLayoutEditable"
            >
              <span>Edit Main Layout</span>
              <md-icon>edit</md-icon>
            </md-menu-item>
            <md-menu-item @click="saveMainLayout" v-show="isMainLayoutEditable">
              <span>Save Main Layout</span>
              <md-icon>save</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapState } from 'vuex';

import {
  DISABLE_EDIT_MODE_API_LAYOUT,
  ENABLE_EDIT_MODE_API_LAYOUT,
  DISABLE_EDIT_MODE_MAIN_LAYOUT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  SAVE_API_LAYOUT,
  SAVE_MAIN_LAYOUT,
  TOGGLE_NAVIGATION_BAR
} from '../types/action-types';

import { API_ROUTE_NAME } from '../routes.js';

export default {
  computed: {
    ...mapState({
      isApiLayoutEditable: (state) => state.apiLayouts.isEditModeActive,
      isMainLayoutEditable: (state) => state.mainLayout.isEditModeActive
    })
  },
  data() {
    return {
      API_ROUTE_NAME: API_ROUTE_NAME
    };
  },
  methods: {
    onMenuClick() {
      this.$store.dispatch(TOGGLE_NAVIGATION_BAR);
    },
    editApiLayout() {
      this.$store.dispatch(ENABLE_EDIT_MODE_API_LAYOUT);
    },
    saveApiLayout() {
      this.$store.dispatch(DISABLE_EDIT_MODE_API_LAYOUT);
      this.$store.dispatch(SAVE_API_LAYOUT);
    },
    editMainLayout() {
      this.$store.dispatch(ENABLE_EDIT_MODE_MAIN_LAYOUT);
    },
    saveMainLayout() {
      this.$store.dispatch(DISABLE_EDIT_MODE_MAIN_LAYOUT);
      this.$store.dispatch(SAVE_MAIN_LAYOUT);
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  watch: {}
};
</script>

<style>
.menu-bar {
  height: 100%;
}
</style>
