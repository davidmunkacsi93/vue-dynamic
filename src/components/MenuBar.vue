<template>
  <md-toolbar class="menu-bar md-primary">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start"></div>
      <h3 class="md-title">VueDynamic</h3>

      <div class="md-toolbar-section-end">
        <md-menu md-size="big" md-direction="bottom-end">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item
              @click="saveApiLayout"
              v-show="$route.name === API_ROUTE_NAME && saveFormsRequired"
            >
              <span>Save Forms</span>
              <md-icon>save</md-icon>
            </md-menu-item>
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
import ActionsMixin from '../components/ActionsMixin';

export default {
  mixins: [ActionsMixin],
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
