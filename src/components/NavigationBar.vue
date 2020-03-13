<template>
  <div ref="navigationBar" class="full-control navigation-bar">
    <h3 ref="navigationTitle" class="md-title">Navigation</h3>
    <md-list ref="navigationList">
      <md-list-item :to="homePath">
        <md-icon>home</md-icon>
        <span class="md-list-item-text">Home</span>
      </md-list-item>
      <md-list-item md-expand @click="onExpand" v-if="availableApis.length > 0">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
        <md-list slot="md-expand">
          <md-list-item
            :to="api.apiPath"
            v-for="api in availableApis"
            :key="api.apiId"
          >
            <span>{{ api.title }}</span>
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
import {
  SET_NAVIGATION_BAR_HEIGHT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  DISABLE_EDIT_MODE_MAIN_LAYOUT
} from "../types/action-types";
import EventBus from "../utils/event-bus";
import { API_ADDED, LAYOUT_UPDATED, COMPACT } from "../types/event-types";
export default {
  data() {
    return {
      addApiPath: "/addApi",
      homePath: "/"
    };
  },
  created() {
    EventBus.$on(API_ADDED, this.onApiAdded);
  },
  beforeDestroy() {
    EventBus.$off(API_ADDED, this.onApiAdded);
    window.removeEventListener("resize", this.setNavigationBarHeight);
  },
  mounted() {
    this.setNavigationBarHeight();
    window.addEventListener("resize", this.setNavigationBarHeight);
  },
  computed: {
    ...mapState({
      availableApis: state => state.apiLayouts.apis
    })
  },
  methods: {
    onApiAdded() {
      this.setNavigationBarHeight();
    },
    onExpand() {
      this.setNavigationBarHeight();
    },
    setNavigationBarHeight() {
      setTimeout(() => {
        var navigationBarGridItem = this.$parent;
        var navigationTitleHeight = this.$refs.navigationTitle.clientHeight;
        var navigationListHeight = this.$refs.navigationList.$el.clientHeight;
        var navigationBarHeight = navigationTitleHeight + navigationListHeight;
        navigationBarGridItem.innerH =
          Math.ceil(navigationBarHeight / navigationBarGridItem.rowHeight) + 1;
        this.$store.dispatch(ENABLE_EDIT_MODE_MAIN_LAYOUT);
        this.$store.dispatch(
          SET_NAVIGATION_BAR_HEIGHT,
          navigationBarGridItem.innerH
        );
        setTimeout(() => {
          this.$store.dispatch(DISABLE_EDIT_MODE_MAIN_LAYOUT);
        }, 50);
        EventBus.$emit(COMPACT);
        EventBus.$emit(LAYOUT_UPDATED);
      }, 25);
    }
  }
};
</script>

<style>
.navigation-bar {
  height: 100%;
  padding: 10px;
}
</style>
