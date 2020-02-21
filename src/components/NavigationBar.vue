<template>
  <div class="full-control navigation-bar">
    <h3 class="md-title">Navigation</h3>
    <md-list>
      <md-list-item :to="homePath">
        <md-icon>home</md-icon>
        <span class="md-list-item-text">Home</span>
      </md-list-item>
      <md-list-item md-expand v-if="availableApis.length > 0">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
        <md-list slot="md-expand">
          <md-list-item
            :to="api.apiPath"
            v-for="api in availableApis"
            :key="api.apiId"
          >
            <span>{{ api.apiName }}</span>
          </md-list-item>
        </md-list>
      </md-list-item>
      <md-list-item v-if="availableApis.length === 0">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
      </md-list-item>
      <md-list-item :to="addApiPath">
        <md-icon>http</md-icon>
        <span class="md-list-item-text">Add API</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addApiPath: "/addApi",
      homePath: "/"
    };
  },
  computed: {
    ...mapState({
      availableApis: state => state.apiLayouts.apis
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
