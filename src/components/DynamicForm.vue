<template>
  <form novalidate @submit.prevent="validateForm" :id="'form-' + uuid">
    <md-list>
      <draggable v-model="controls">
        <md-list-item v-for="control in controls" :key="control.order">
          <md-chips
            v-if="control.element === CHIPS"
            v-model="form[control.label]"
            :class="getValidationClass(control.label)"
          ></md-chips>
          <md-datepicker
            v-model="form[control.label]"
            v-if="control.element === DATE_PICKER"
            :class="getValidationClass(control.label)"
          >
            <label>{{ control.label }}</label>
          </md-datepicker>
          <md-field v-if="control.element === DROP_DOWN">
            <label>{{ control.label }}</label>
            <md-select
              v-model="form[control.label]"
              :class="getValidationClass(control.label)"
            >
              <md-option
                v-for="(value, name, index) in control.values"
                :value="value"
                :key="index"
              >
                {{ value }}
              </md-option>
            </md-select>
          </md-field>
          <md-switch
            v-if="control.element === SWITCH"
            v-model="form[control.label]"
          >
            {{ control.label }}
          </md-switch>
          <md-field v-if="control.element === FLOAT_INPUT">
            <label :for="control.label">{{ control.label }}</label>
            <md-input
              :id="control.label"
              v-model="form[control.label]"
              type="number"
              step="0.01"
              :class="getValidationClass(control.label)"
            ></md-input>
          </md-field>
          <md-field v-if="control.element === NUMBER_INPUT">
            <label>{{ control.label }}</label>
            <md-input
              v-model="form[control.label]"
              type="number"
              :class="getValidationClass(control.label)"
            ></md-input>
          </md-field>
          <md-field v-if="control.element === PASSWORD_INPUT">
            <label>{{ control.label }}</label>
            <md-input
              v-model="form[control.label]"
              type="password"
              :class="getValidationClass(control.label)"
            ></md-input>
          </md-field>
          <md-field v-if="control.element === TEXT_INPUT">
            <label>{{ control.label }}</label>
            <md-input
              v-model="form[control.label]"
              type="text"
              :class="getValidationClass(control.label)"
            ></md-input>
          </md-field>
          <md-tooltip v-if="control.description" md-direction="left">
            {{ control.description }}
          </md-tooltip>
        </md-list-item>
        <!-- <span class="md-error" v-if="$v && !$v.form[control.label].minlength">
          {{ control.label }} is required
        </span>
        <span
          class="md-error"
          v-else-if="$v && !$v.form[control.label].minlength"
        >
          Invalid {{ control.label }}
        </span>
        <span
          class="md-error"
          v-else-if="$v && !$v.form[control.label].maxlength"
        >
          Invalid {{ control.label }}
        </span> -->
      </draggable>
    </md-list>
  </form>
</template>

<script>
import draggable from "vuedraggable";
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

import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  components: {
    draggable
  },
  props: {
    controls: {
      type: Array,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    },
    uuid: {
      type: String,
      required: true
    }
  },
  validations: { form: {} },
  beforeMount() {
    this.controls.forEach(control => {
      this.form[control.label] = null;

      var controlValidations = {};
      if (control.required) {
        controlValidations.required = required;
      }
      if (control.minimum) {
        controlValidations.minLength = minLength(control.minimum);
      }
      if (control.maximum) {
        controlValidations.maxLength = maxLength(control.maximum);
      }

      if (control.label === "email") {
        controlValidations.email = email;
      }
      this.$v[control.label] = controlValidations;
    });
  },
  data: () => ({
    form: {},

    CHIPS: CHIPS,
    DATE_PICKER: DATE_PICKER,
    DROP_DOWN: DROP_DOWN,
    FLOAT_INPUT: FLOAT_INPUT,
    NUMBER_INPUT: NUMBER_INPUT,
    PASSWORD_INPUT: PASSWORD_INPUT,
    TEXT_INPUT: TEXT_INPUT,
    SWITCH: SWITCH
  }),
  methods: {
    callEndpoint() {
      console.log(this.$v);
      console.log("Calling endpoint...");
    },
    clearForm() {
      this.$v.reset();
      var formFields = Object.keys(this.form);
      formFields.forEach(field => {
        this.form[field] = null;
      });
    },
    getValidationClass(fieldName) {
      if (!this.$v) return;

      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.callEndpoint();
      }
    }
  }
};
</script>

<style></style>
