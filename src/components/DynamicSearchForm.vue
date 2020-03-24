<template>
  <md-tabs :md-active-tab.sync="activeTab" :class="{ stretch: initialized }">
    <md-tab id="tab-search" md-label="Search" @click="onSearchTabClick">
      <dynamic-form-controls :controls="controls"></dynamic-form-controls>
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
import DynamicFormControls from "./DynamicFormControls";
import DynamicList from "./DynamicList";
import DynamicTable from "./DynamicTable";

import EventBus from "../utils/event-bus";
import { REQUEST_SUCCESSFUL } from "../types/event-types";
import { LIST, TABLE } from "../types/layout-item-types";

export default {
  components: { DynamicFormControls, DynamicTable, DynamicList },
  props: {
    controls: {
      type: Array,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    },
    listType: {
      required: false
    },
    tableModel: {
      required: false
    },
    type: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      TABLE: TABLE,
      LIST: LIST,

      results: [],
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
