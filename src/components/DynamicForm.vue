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
import CardHeader from "./CardHeader";
import DynamicComponent from "./DynamicComponent.vue";
import DynamicFormControls from "./DynamicFormControls.vue";

export default {
  extends: DynamicComponent,
  components: { CardHeader, DynamicFormControls },
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
