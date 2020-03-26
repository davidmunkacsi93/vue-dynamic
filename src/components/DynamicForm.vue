<template>
  <form novalidate @submit.prevent="validateForm" :id="'form-' + uuid">
    <md-list>
      <draggable v-model="controls">
        <md-list-item v-for="control in controls" :key="control.order">
          <md-field :class="getValidationClass(control.label)">
            <label :for="control.label">{{ control.label }}</label>
            <md-chips
              v-if="control.element === CHIPS"
              v-model="form[control.label]"
            ></md-chips>
            <md-datepicker
              v-model="form[control.label]"
              v-if="control.element === DATE_PICKER"
            >
            </md-datepicker>
            <md-input
              v-else-if="control.element === FLOAT_INPUT"
              :id="control.label"
              v-model="form[control.label]"
              type="number"
              step="0.01"
            ></md-input>
            <md-input
              v-else-if="control.element === NUMBER_INPUT"
              v-model="form[control.label]"
              type="number"
            ></md-input>
            <md-input
              v-else-if="control.element === TEXT_INPUT"
              v-model="form[control.label]"
              type="text"
            ></md-input>
            <md-input
              v-else-if="control.element === PASSWORD_INPUT"
              v-model="form[control.label]"
              type="password"
            ></md-input>
            <md-select
              v-if="control.element === DROP_DOWN"
              v-model="form[control.label]"
            >
              <md-option
                v-for="(value, name, index) in control.values"
                :value="value"
                :key="index"
              >
                {{ value }}
              </md-option>
            </md-select>
            <md-switch
              v-if="control.element === SWITCH"
              v-model="form[control.label]"
            >
              {{ control.label }}
            </md-switch>
            <md-tooltip v-if="control.description" md-direction="left">
              {{ control.description }}
            </md-tooltip>
            <template v-if="$v.$dirty && $v.form[control.label]">
              <span class="md-error" v-if="!$v.form[control.label].required">
                {{ control.label }} is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.form[control.label].minLength"
              >
                Invalid {{ control.label }}
              </span>
              <span
                class="md-error"
                v-else-if="!$v.form[control.label].maxLength"
              >
                Invalid {{ control.label }}
              </span>
              <span class="md-error" v-else-if="!$v.form[control.label].email">
                Invalid email address
              </span>
            </template>
          </md-field>
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
      console.log(field);
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateForm() {
      this.$v.$touch();
      console.log(this.$v.form);
      if (!this.$v.$invalid) {
        this.callEndpoint();
      }
    }
  }
};
</script>

<style></style>
