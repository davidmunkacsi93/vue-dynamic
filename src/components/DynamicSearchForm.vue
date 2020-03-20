<template>
  <md-card
    ref="dynamicComponent"
    class="md-layout dynamic-component"
    md-with-hover
  >
    <md-card-header class="md-layout-item md-size-100">
      <md-card-header-text>
        <div class="md-title" ref="title">{{ path }}</div>
        <div class="md-subhead" v-if="description">{{ description }}</div>
      </md-card-header-text>
      <md-menu md-size="big" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="removeGridItem">
            <span>Remove</span>
            <md-icon>clear</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-header>

    <md-progress-bar
      v-if="isLoading"
      class="md-layout-item md-size-100"
      md-mode="query"
    ></md-progress-bar>

    <md-card-content class="md-layout-item md-size-100">
      <md-tabs :md-active-tab="activeTab">
        <md-tab id="tab-search" md-label="Search">
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
    <md-card-actions class="md-layout-item md-size-100">
      <md-button @click="callApiMethod">{{ httpMethod }}</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import DynamicComponent from "./DynamicComponent.vue";
import DynamicFormControls from "./DynamicFormControls";
import DynamicList from "./DynamicList";
import DynamicTable from "./DynamicTable";

import EventBus from "../utils/event-bus";
import { REQUEST_FAILED } from "../types/event-types";
import { LIST, TABLE } from "../types/layout-item-types";

export default {
  extends: DynamicComponent,
  components: { DynamicFormControls, DynamicTable, DynamicList },
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
    callApiMethod() {
      this.isLoading = true;

      var configuration = {
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
<style>
.dynamic-component {
  height: 100% !important;
}
</style>
