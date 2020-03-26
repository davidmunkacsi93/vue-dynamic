<template>
  <form novalidate @submit.prevent="validateForm" :id="'form-' + uuid">
    <md-list>
      <draggable v-model="controls">
        <md-list-item v-for="control in controls" :key="control.order">
          <md-field
            v-if="
              control.element === DROP_DOWN ||
                control.element === FLOAT_INPUT ||
                control.element === NUMBER_INPUT ||
                control.element === TEXT_INPUT ||
                control.element === PASSWORD_INPUT
            "
            :class="getValidationClass(control.label)"
          >
            <label :for="control.label">{{ control.label }}</label>
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
            <md-input
              v-else-if="control.element === FLOAT_INPUT"
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
              v-else-if="
                control.label !== 'password' && control.element === TEXT_INPUT
              "
              v-model="form[control.label]"
              type="text"
            ></md-input>
            <md-input
              v-else-if="
                control.label === 'password' ||
                  control.element === PASSWORD_INPUT
              "
              v-model="form[control.label]"
              type="password"
            ></md-input>

            <md-tooltip v-if="control.description" md-direction="left">
              {{ control.description }}
            </md-tooltip>
            <template v-if="$v.$dirty && $v.form[control.label]">
              <span
                class="md-error"
                v-if="$v.form[control.label].required === false"
              >
                {{ control.label }} is required
              </span>
              <span
                class="md-error"
                v-else-if="$v.form[control.label].minLength === false"
              >
                Invalid {{ control.label }}
              </span>
              <span
                class="md-error"
                v-else-if="$v.form[control.label].maxLength === false"
              >
                Invalid {{ control.label }}
              </span>
              <span
                class="md-error"
                v-else-if="$v.form[control.label].email === false"
              >
                Invalid email address
              </span>
            </template>
          </md-field>
          <template
            v-else-if="
              control.element === CHIPS || control.element === DATE_PICKER
            "
          >
            <md-chips
              v-if="control.element === CHIPS"
              v-model="form[control.label]"
              :class="getValidationClass(control.label)"
            >
              <label>{{ control.label }}</label>
              <template v-if="$v.$dirty && $v.form[control.label]">
                <span
                  class="validation-error"
                  v-if="$v.form[control.label].required === false"
                >
                  {{ control.label }} is required
                </span>
              </template>
            </md-chips>
            <md-datepicker
              v-model="form[control.label]"
              v-if="control.element === DATE_PICKER"
              :class="getValidationClass(control.label)"
            >
              <label>{{ control.label }}</label>
              <template v-if="$v.$dirty && $v.form[control.label]">
                <span
                  class="validation-error"
                  v-if="$v.form[control.label].required === false"
                >
                  {{ control.label }} is required
                </span>
              </template>
            </md-datepicker>
            <md-tooltip v-if="control.description" md-direction="left">
              {{ control.description }}
            </md-tooltip>
          </template>
          <template v-else>
            <md-switch
              v-if="control.element === SWITCH"
              v-model="form[control.label]"
            >
              <label>{{ control.label }}</label>
            </md-switch>
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
      if (control.element === CHIPS) {
        this.$set(this.form, control.label, []);
      } else {
        this.$set(this.form, control.label, null);
      }
    });
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
      console.log(this.$v.form);
      if (!this.$v.$invalid) {
        this.callEndpoint();
      }
    }
  }
};
</script>

<style>
.validation-error {
  display: block !important;
  left: 0;
  opacity: 1;
  transform: translateZ(0);
  color: var(--md-theme-default-fieldvariant, #ff1744);
  height: 20px;
  position: absolute;
  bottom: -22px;
  font-size: 12px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
