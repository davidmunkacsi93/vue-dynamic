<template>
  <md-list class="control-list">
    <md-list-item v-for="control in controls" :key="control.order">
      <md-chips
        v-if="control.element === CHIPS"
        v-model="control.value"
      ></md-chips>
      <md-datepicker
        v-model="control.value"
        v-if="control.element === DATE_PICKER"
      >
        <label>{{ control.label }}</label>
      </md-datepicker>
      <md-field v-if="control.element === DROP_DOWN">
        <label>{{ control.label }}</label>
        <md-select v-model="control.value">
          <md-option
            v-for="(value, name, index) in control.values"
            :value="value"
            :key="index"
          >
            {{ value }}
          </md-option>
        </md-select>
      </md-field>
      <md-switch v-model="control.value" v-if="control.element === SWITCH">{{
        control.label
      }}</md-switch>
      <md-field v-if="control.element === FLOAT_INPUT">
        <label>{{ control.label }}</label>
        <md-input v-model="control.value" type="number" step="0.01"></md-input>
      </md-field>
      <md-field v-if="control.element === NUMBER_INPUT">
        <label>{{ control.label }}</label>
        <md-input v-model="control.value" type="number"></md-input>
      </md-field>
      <md-field v-if="control.element === TEXT_INPUT">
        <label>{{ control.label }}</label>
        <md-input v-model="control.value" type="text"></md-input>
      </md-field>
    </md-list-item>
  </md-list>
</template>

<script>
import {
  DROP_DOWN,
  FLOAT_INPUT,
  NUMBER_INPUT,
  TEXT_INPUT,
  PASSWORD_INPUT,
  SWITCH,
  DATE_PICKER,
  CHIPS
} from "../types/layout-item-types";

export default {
  props: {
    controls: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      CHIPS: CHIPS,
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
