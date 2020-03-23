<template>
  <md-card
    ref="dynamicComponent"
    class="md-layout dynamic-component"
    :class="{ 'component-height': initialized }"
    md-with-hover
  >
    <md-card-header
      class="md-layout-item md-layout md-size-100"
      :class="{ 'title-height': initialized }"
    >
      <md-card-header-text class="md-layout-item md-size-90">
        <div class="md-title" ref="title">{{ path }}</div>
        <div class="md-subhead">{{ description }}</div>
      </md-card-header-text>
      <md-menu
        md-size="big"
        md-direction="bottom-end"
        class="md-layout-item md-size-10"
      >
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

    <md-card-content
      class="md-layout-item md-size-100"
      :class="{ 'content-height': initialized }"
    >
      <dynamic-form-controls
        :class="{ stretch: initialized }"
        :controls="controls"
      ></dynamic-form-controls>
    </md-card-content>
    <md-card-actions
      class="md-layout-item md-size-100"
      :class="{ 'action-height': initialized }"
    >
      <md-button @click="callApiMethod">{{ httpMethod }}</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import {
  DROP_DOWN,
  FLOAT_INPUT,
  NUMBER_INPUT,
  TEXT_INPUT,
  PASSWORD_INPUT,
  SWITCH,
  DATE_PICKER
} from "../types/layout-item-types";
import DynamicComponent from "./DynamicComponent.vue";
import DynamicFormControls from "./DynamicFormControls.vue";

export default {
  extends: DynamicComponent,
  components: { DynamicFormControls },
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
<style></style>
