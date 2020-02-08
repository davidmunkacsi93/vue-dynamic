<template>
  <div class="full-control navigation-bar">
    <h3 class="md-title">Navigation</h3>
    <md-list>
      <md-list-item md-expand>
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
        <md-list slot="md-expand">
          <md-list-item v-for="api in availableApis" :key="api.apiId">
            <router-link to="/api">{{ api.apiName }}</router-link>
          </md-list-item>
        </md-list>
      </md-list-item>
      <md-list-item>
        <md-icon>http</md-icon>
        <span class="md-list-item-text">Add API</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      availableApis: state => state.apiLayouts.apiLayouts
    })
  },
  methods: {}
};
</script>

<style>
.navigation-bar {
  height: 100%;
  padding: 10px;
}
</style>
