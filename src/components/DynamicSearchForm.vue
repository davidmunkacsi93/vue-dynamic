<template>
  <md-tabs :md-active-tab.sync="activeTab">
    <md-tab id="tab-search" md-label="Search" @click="onSearchTabClick">
      <dynamic-form
        :baseURL="baseURL"
        :httpMethod="httpMethod"
        :path="path"
        :controls="controls"
        :initialized="initialized"
        :uuid="uuid"
      ></dynamic-form>
    </md-tab>
    <md-tab id="tab-results" md-label="Results">
      <dynamic-tree :model="results"> </dynamic-tree>
    </md-tab>
  </md-tabs>
</template>
<script>
import DynamicForm from './DynamicForm';
import DynamicTree from './DynamicTree';

import EventBus from '../utils/event-bus';
import { REQUEST_SUCCESSFUL } from '../types/event-types';
import { TREE, TABLE } from '../types/layout-item-types';

export default {
  components: { DynamicForm, DynamicTree },
  props: {
    baseURL: {
      type: String,
      required: true
    },
    controls: {
      type: Array,
      required: true
    },
    httpMethod: {
      type: String,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    results: {
      required: true
    },
    type: {
      required: true,
      type: String
    },
    uuid: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      TABLE: TABLE,
      TREE: TREE,

      activeTab: 'tab-search',
      isLoading: false
    };
  },
  created() {
    EventBus.$on(REQUEST_SUCCESSFUL, this.onRequestSuccessful);
  },
  beforeDestroy() {
    EventBus.$off(REQUEST_SUCCESSFUL, this.onRequestSuccessful);
  },
  methods: {
    onSearchTabClick() {
      this.activeTab = 'tab-search';
    },
    onRequestSuccessful(payload) {
      if (this.uuid !== payload.uuid) return;

      this.activeTab = 'tab-results';
    }
  }
};
</script>
<style></style>
