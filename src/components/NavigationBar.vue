<template>
  <md-app-drawer class="navigation-bar" md-permanent="full">
    <h3 class="md-title">Navigation</h3>
    <md-list>
      <md-list-item>
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
      </md-list-item>
      <md-list-item>
        <md-icon>http</md-icon>
        <span class="md-list-item-text">Add API</span>
      </md-list-item>
    </md-list>
  </md-app-drawer>
</template>

<script>
export default {
  computed: {},
  methods: {}
};
</script>

<style>
.navigation-bar {
  height: 100%;
  width: auto !important;
  padding: 10px;
}
</style>
