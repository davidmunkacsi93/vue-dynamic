<template>
  <md-speed-dial class="md-fixed md-bottom-left" md-direction="top">
    <md-speed-dial-target class="speed-dial-target">
      <md-icon>edit</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content class="speed-dial-content">
      <md-button
        @click="saveFormLayouts"
        v-show="$route.name === API_ROUTE_NAME && saveFormsRequired"
      >
        <md-icon>save</md-icon>
        <span>Save Forms</span>
      </md-button>
      <md-button
        @click="editApiLayout"
        v-show="$route.name === API_ROUTE_NAME && !isApiLayoutEditable"
      >
        <md-icon>edit</md-icon>
        <span>Edit API Layout</span>
      </md-button>
      <md-button
        @click="saveApiLayout"
        v-show="$route.name === API_ROUTE_NAME && isApiLayoutEditable"
      >
        <md-icon>save</md-icon>
        <span>Save API Layout</span>
      </md-button>
      <md-button @click="editMainLayout" v-show="!isMainLayoutEditable">
        <md-icon>edit</md-icon>
        <span>Edit Main Layout</span>
      </md-button>
      <md-button @click="saveMainLayout" v-show="isMainLayoutEditable">
        <md-icon>save</md-icon>
        <span>Save Main Layout</span>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>
import ActionsMixin from '../components/ActionsMixin';

export default {
  mixins: [ActionsMixin]
};
</script>
