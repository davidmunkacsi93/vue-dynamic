<template>
  <md-card
    ref="dynamicComponent"
    class="md-layout dynamic-component"
    :class="{ 'component-height': initialized }"
    md-with-hover
  >
    <card-header
      :description="description"
      :initialized="initialized"
      :path="path"
      :uuid="uuid"
    ></card-header>

    <md-progress-bar
      v-if="isLoading"
      class="md-layout-item md-size-100"
      md-mode="query"
    ></md-progress-bar>

    <md-card-content
      class="md-layout-item md-size-100"
      :class="{ 'content-height': initialized }"
    >
      <md-tabs
        :md-active-tab.sync="activeTab"
        :class="{ stretch: initialized }"
      >
        <md-tab id="tab-search" md-label="Search" @click="onSearchTabClick">
          <dynamic-form-controls :controls="controls"></dynamic-form-controls>
        </md-tab>
        <md-tab id="tab-results" md-label="Results">
          <dynamic-list
            v-if="type === LIST"
            :listType="listType"
            :values="results"
          >
          </dynamic-list>
          <dynamic-table
            v-else-if="type === TABLE"
            :model="tableModel"
            :values="results"
          >
          </dynamic-table>
        </md-tab>
      </md-tabs>
    </md-card-content>
    <md-card-actions
      class="md-layout-item md-size-100"
      :class="{ 'actions-height': initialized }"
    >
      <md-button @click="callApiMethod">{{ httpMethod }}</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import CardHeader from "./CardHeader.vue";
import DynamicComponent from "./DynamicComponent.vue";
import DynamicFormControls from "./DynamicFormControls";
import DynamicList from "./DynamicList";
import DynamicTable from "./DynamicTable";

import EventBus from "../utils/event-bus";
import { REQUEST_FAILED } from "../types/event-types";
import { LIST, TABLE } from "../types/layout-item-types";

export default {
  extends: DynamicComponent,
  components: { CardHeader, DynamicFormControls, DynamicTable, DynamicList },
  props: {
    controls: {
      type: Array,
      required: true
    },
    tableModel: {
      required: false
    },
    listType: {
      required: false
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
  methods: {
    onSearchTabClick() {
      this.activeTab = "tab-search";
    },
    callApiMethod() {
      this.isLoading = true;

      var configuration = {
        crossDomain: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type"
        },
        baseURL: this.baseURL,
        url: this.path,
        method: this.httpMethod.toLowerCase()
      };

      this.$http
        .request(configuration)
        .then(response => {
          this.isLoading = false;
          this.activeTab = "tab-results";
          this.results = response.data;
        })
        .catch(reason => {
          this.isLoading = false;
          EventBus.$emit(REQUEST_FAILED, { errorMessage: reason.toString() });
        });
    }
  }
};
</script>
<style></style>
