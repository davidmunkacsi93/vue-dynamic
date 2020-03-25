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
          <template v-if="$v.form[control.label]">
            <span
              class="md-error"
              v-if="
                $v.form[control.label].required &&
                  !$v.form[control.label].required.$invalid
              "
            >
              {{ control.label }} is required
            </span>
            <span
              class="md-error"
              v-else-if="
                $v.form[control.label].minLength &&
                  !$v.form[control.label].minLength.$invalid
              "
            >
              Invalid {{ control.label }}
            </span>
            <span
              class="md-error"
              v-else-if="
                $v.form[control.label].maxLength &&
                  !$v.form[control.label].maxLength.$invalid
              "
            >
              Invalid {{ control.label }}
            </span>
            <span
              class="md-error"
              v-else-if="
                $v.form[control.label].email &&
                  !$v.form[control.label].email.$invalid
              "
            >
              Invalid email address
            </span>
          </template>
        </md-list-item>
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
import * as Validators from "vuelidate/lib/validators";

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
  validations() {
    return { form: this.createValidationRules(this.controls) };
  },
  created() {
    this.controls.forEach(control => {
      this.$set(this.form, control.label, null);
    });
  },
  mounted() {
    console.log(this.$v);
  },
  data: () => ({
    form: {},
    isDirty: false,

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
      console.log("Calling endpoint...");
    },
    createValidationRules(controls) {
      var validationRules = {};
      controls.forEach(control => {
        var controlValidations = {};

        if (control.required) {
          controlValidations.required = Validators["required"];
        }
        if (control.minimum) {
          controlValidations.minLength = Validators["minLength"](
            control.minimum
          );
        }
        if (control.maximum) {
          controlValidations.maxLength = Validators["maxLength"](
            control.maximum
          );
        }

        if (control.label === "email") {
          controlValidations.email = Validators["email"];
        }
        if (Object.keys(controlValidations).length > 0) {
          validationRules[control.label] = controlValidations;
        }
      });

      return validationRules;
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
