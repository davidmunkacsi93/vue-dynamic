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
      <div ref="resultsContainer"></div>
    </md-tab>
  </md-tabs>
</template>
<script>
import Vue from 'vue';
import DynamicForm from './DynamicForm';
import DynamicTreeView from './DynamicTreeView';

import EventBus from '../utils/event-bus';
import { REQUEST_SUCCESSFUL } from '../types/event-types';
import { TREE } from '../types/layout-item-types';

export default {
  components: { DynamicForm },
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
      TREE: TREE,
      results: [],

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

      this.results = payload.response.data;

      if (this.results.data) {
        this.results = this.results.data;
      }
      this.createDynamicTreeView(this.results);
      this.activeTab = 'tab-results';
    },
    createDynamicTreeView(model) {
      var DynamicTreeViewClass = Vue.extend(DynamicTreeView);
      var instance = new DynamicTreeViewClass({
        propsData: {
          model: this.results
        }
      });
      instance.$mount();
      while (this.$refs.resultsContainer.firstChild) {
        this.$refs.resultsContainer.removeChild(
          this.$refs.resultsContainer.lastChild
        );
      }
      this.$refs.resultsContainer.appendChild(instance.$el);
    }
  }
};
</script>
<style></style>
