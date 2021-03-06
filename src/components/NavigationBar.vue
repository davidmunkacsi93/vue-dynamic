<template>
  <div ref="navigationBar" class="full-control navigation-bar">
    <h3 ref="navigationTitle" class="md-title">Navigation</h3>
    <md-list ref="navigationList">
      <md-list-item :to="homePath" @click="closeExpandable">
        <md-icon>home</md-icon>
        <span class="md-list-item-text">Home</span>
      </md-list-item>
      <md-list-item
        md-expand
        :md-expanded.sync="apisExpanded"
        @click="onExpand"
        v-if="availableApis.length > 0"
      >
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
        <md-list slot="md-expand">
          <md-list-item
            :to="apiPath + '/' + api.id"
            v-for="api in availableApis"
            :key="api.id"
            @click="closeExpandable"
          >
            <span>{{ api.title }} - {{ api.apiVersion }}</span>
          </md-list-item>
        </md-list>
      </md-list-item>

      <md-list-item v-if="availableApis.length === 0">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">My APIs</span>
      </md-list-item>
      <md-list-item :to="apiKeysPath" @click="closeExpandable">
        <md-icon>vpn_key</md-icon>
        <span class="md-list-item-text">API keys</span>
      </md-list-item>
      <md-list-item :to="addApiPath" @click="closeExpandable">
        <md-icon>http</md-icon>
        <span class="md-list-item-text">Add API</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  SET_NAVIGATION_BAR_HEIGHT,
  ENABLE_EDIT_MODE_MAIN_LAYOUT,
  DISABLE_EDIT_MODE_MAIN_LAYOUT
} from '../types/action-types';
import { API_ADDED, COMPACT, LAYOUT_UPDATED } from '../types/event-types';

import EventBus from '../utils/event-bus';
import ApiModelRepository from '../repositories/api-model-repsository';

export default {
  props: {
    apis: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      apisExpanded: false,

      availableApis: [],
      apiPath: '/api',
      addApiPath: '/addApi',
      apiKeysPath: '/apiKeys',
      homePath: '/'
    };
  },
  created() {
    EventBus.$on(API_ADDED, this.onApiAdded);
  },
  beforeDestroy() {
    EventBus.$off(API_ADDED, this.onApiAdded);
    window.removeEventListener('resize', this.setNavigationBarHeight);
  },
  mounted() {
    this.setNavigationBarHeight();
    window.addEventListener('resize', this.setNavigationBarHeight);
  },
  methods: {
    closeExpandable() {
      this.apisExpanded = false;
      this.setNavigationBarHeight();
    },
    onApiAdded() {
      ApiModelRepository.getApiModels().then((apiModels) => {
        this.availableApis = apiModels;
        this.setNavigationBarHeight();
      });
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
          Math.ceil(navigationBarHeight / navigationBarGridItem.rowHeight) + 2;
        this.$store.dispatch(ENABLE_EDIT_MODE_MAIN_LAYOUT);
        this.$store.dispatch(
          SET_NAVIGATION_BAR_HEIGHT,
          navigationBarGridItem.innerH
        );
        setTimeout(() => {
          this.$store.dispatch(DISABLE_EDIT_MODE_MAIN_LAYOUT);
        }, 50);
        EventBus.$emit(LAYOUT_UPDATED);
      }, 25);
    }
  },
  watch: {
    apis: function (val) {
      this.availableApis = val;
      this.apis = val;
    }
  }
};
</script>

<style>
.navigation-bar {
  height: 100%;
  padding: 10px 10px 0px 10px;
}
</style>
