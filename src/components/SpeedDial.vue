<template>
  <md-speed-dial class="md-fixed md-bottom-right" md-direction="top">
    <md-speed-dial-target>
      <md-icon>edit</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button
        @click="editApiLayout"
        v-show="$route.name === API_ROUTE_NAME && !isApiLayoutEditable"
      >
        <span>Edit API Layout</span>
        <md-icon>edit</md-icon>
      </md-button>
      <md-button
        @click="saveApiLayout"
        v-show="$route.name === API_ROUTE_NAME && isApiLayoutEditable"
      >
        <span>Save API Layout</span>
        <md-icon>save</md-icon>
      </md-button>
      <md-button @click="editMainLayout" v-show="!isMainLayoutEditable">
        <span>Edit Main Layout</span>
        <md-icon>edit</md-icon>
      </md-button>
      <md-button @click="saveMainLayout" v-show="isMainLayoutEditable">
        <span>Save Main Layout</span>
        <md-icon>save</md-icon>
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

<style></style>
