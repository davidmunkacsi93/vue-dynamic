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
        <md-tab id="tab-results" md-label="Results"></md-tab>
      </md-tabs>
    </md-card-content>
    <md-card-actions>
      <md-button>{{ httpMethod }}</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import DynamicComponent from "./DynamicComponent.vue";
import DynamicFormControls from "./DynamicFormControls";

import {
  DROP_DOWN,
  FLOAT_INPUT,
  NUMBER_INPUT,
  TEXT_INPUT,
  PASSWORD_INPUT,
  SWITCH,
  DATE_PICKER
} from "../types/layout-item-types";

export default {
  extends: DynamicComponent,
  components: { DynamicFormControls },
  props: {
    controls: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      DATE_PICKER: DATE_PICKER,
      DROP_DOWN: DROP_DOWN,
      FLOAT_INPUT: FLOAT_INPUT,
      NUMBER_INPUT: NUMBER_INPUT,
      PASSWORD_INPUT: PASSWORD_INPUT,
      TEXT_INPUT: TEXT_INPUT,
      SWITCH: SWITCH
    };
  }
};
</script>
<style lang="scss">
.md-tabs {
  display: block !important;
}
</style>
