<template>
  <md-card ref="dynamicComponent" class="dynamic-component" md-with-hover>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title" ref="title">{{ path }}</div>
        <div class="md-subhead">{{ description }}</div>
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

    <md-card-content>
      <md-tabs>
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
          <dynamic-grid
            v-else-if="type === GRID"
            :gridModel="gridModel"
            :values="results"
          >
          </dynamic-grid>
        </md-tab>
      </md-tabs>
    </md-card-content>
    <md-card-actions>
      <md-button @click="callApiMethod">{{ httpMethod }}</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import DynamicComponent from "./DynamicComponent.vue";
import DynamicFormControls from "./DynamicFormControls";
import DynamicGrid from "./DynamicGrid";
import DynamicList from "./DynamicList";

import EventBus from "../utils/event-bus";
import { REQUEST_FAILED } from "../types/event-types";
import { LIST, GRID } from "../types/layout-item-types";

export default {
  extends: DynamicComponent,
  components: { DynamicFormControls, DynamicGrid, DynamicList },
  props: {
    controls: {
      type: Array,
      required: true
    },
    gridModel: {
      required: false
    },
    listType: {
      required: false
    }
  },
  data() {
    return {
      GRID: GRID,
      LIST: LIST,
      results: []
    };
  },
  methods: {
    callApiMethod() {
      var configuration = {
        baseURL: this.baseURL,
        url: this.path,
        method: this.httpMethod.toLowerCase()
      };
      this.$http
        .request(configuration)
        .then(response => {
          switch (this.type) {
            case LIST:
              this.results = response.data;
              break;
            case GRID:
              break;
          }
        })
        .catch(reason => {
          console.log(reason);
          EventBus.$emit(REQUEST_FAILED, { errorMessage: reason.toString() });
        });
    }
  }
};
</script>
