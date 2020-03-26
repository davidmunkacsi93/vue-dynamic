<template>
  <md-tabs :md-active-tab.sync="activeTab" :class="{ stretch: initialized }">
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
      <dynamic-list v-if="type === LIST" :listType="listType" :values="results">
      </dynamic-list>
      <dynamic-table
        v-else-if="type === TABLE"
        :model="tableModel"
        :values="results"
      >
      </dynamic-table>
    </md-tab>
  </md-tabs>
</template>
<script>
import DynamicForm from "./DynamicForm";
import DynamicList from "./DynamicList";
import DynamicTable from "./DynamicTable";

import EventBus from "../utils/event-bus";
import { REQUEST_SUCCESSFUL } from "../types/event-types";
import { LIST, TABLE } from "../types/layout-item-types";

export default {
  components: { DynamicForm, DynamicTable, DynamicList },
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
    listType: {
      required: false
    },
    path: {
      type: String,
      required: true
    },
    results: {
      required: true
    },
    tableModel: {
      required: false
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
      LIST: LIST,

      activeTab: "tab-search",
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
      this.activeTab = "tab-search";
    },
    onRequestSuccessful() {
      this.activeTab = "tab-results";
    }
  }
};
</script>
<style></style>
