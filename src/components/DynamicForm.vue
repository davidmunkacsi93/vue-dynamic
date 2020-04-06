<template>
  <form novalidate @submit.prevent="validateForm" :id="'form-' + uuid">
    <grid-layout-base
      v-if="innerControls && innerControls.length > 0"
      ref="controlLayout"
      class="control-layout"
      :layout.sync="innerControls"
      :col-num="12"
      :row-height="30"
      :margin="[10, 10]"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="control in innerControls"
        :x="control.x"
        :y="control.y"
        :w="control.w"
        :h="control.h"
        :i="control.i"
        :isDraggable="control.isDraggable"
        :isResizable="control.isResizable"
        :initialized="control.initialized"
        :autoSizeRequired="false"
        :type="control.type"
        :static="control.static"
        :key="control.i"
        :uuid="control.uuid"
      >
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
              control.label === 'password' || control.element === PASSWORD_INPUT
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
      </grid-item>
    </grid-layout-base>
  </form>
</template>

<script>
import GridLayoutBase from '../components/GridLayoutBase';
import GridItem from '../components/GridItem';

import {
  DROP_DOWN,
  FLOAT_INPUT,
  NUMBER_INPUT,
  TEXT_INPUT,
  PASSWORD_INPUT,
  SWITCH,
  DATE_PICKER,
  CHIPS
} from '../types/layout-item-types';

import { validationMixin } from 'vuelidate';
import * as Validators from 'vuelidate/lib/validators';
import EventBus from '../utils/event-bus';
import {
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  REQUEST_STARTED
} from '../types/event-types';

export default {
  mixins: [validationMixin],
  components: {
    GridLayoutBase,
    GridItem
  },
  props: {
    baseURL: {
      type: String,
      required: true
    },
    controls: {
      type: Array,
      required: true
    },
    httpMethod: {
      type: String,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    uuid: {
      type: String,
      required: true
    }
  },
  validations() {
    return { form: this.createValidationRules(this.innerControls) };
  },
  created() {
    this.innerControls = this.controls;
    this.innerControls.forEach((control) => {
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
    innerControls: [],

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
      EventBus.$emit(REQUEST_STARTED, { uuid: this.uuid });
      var configuration = this.createRequestConfiguration();
      console.log(configuration);
      this.$http
        .request(configuration)
        .then((response) => {
          var payload = {
            response: response,
            uuid: this.uuid
          };

          EventBus.$emit(REQUEST_SUCCESSFUL, payload);
        })
        .catch((reason) => {
          var payload = {
            errorMessage: reason.toString(),
            uuid: this.uuid
          };
          EventBus.$emit(REQUEST_FAILED, payload);
        });
    },
    createRequestConfiguration() {
      var params = {};
      var headers = {};
      var apiKeyData = this.getApiKeyData(this.baseURL);

      if (apiKeyData) {
        if (apiKeyData.type === 'header') {
          headers[apiKeyData.parameterName] = apiKeyData.apiKey;
        } else if (apiKeyData.type === 'query') {
          params[apiKeyData.parameterName] = apiKeyData.apiKey;
        }
      }

      var bodyFormData = new FormData();
      var finalPath = this.path;

      var formValue = null;
      for (let control of this.controls) {
        formValue = this.form[control.label];
        if (!formValue) continue;

        if (control.in === 'query') {
          params[control.label] = formValue;
        } else if (control.in === 'path') {
          var pathSegment = `{${control.label}}`;
          if (!finalPath.includes(pathSegment)) continue;
          finalPath = finalPath.replace(pathSegment, formValue);
        } else if (control.in === 'body' || control.in === 'formData') {
          bodyFormData.set(control.label, formValue);
        } else {
          throw new Error(`Unknown parameter type: ${control.in}`);
        }
      }

      var configuration = {
        crossDomain: true,
        baseURL: this.baseURL,
        data: bodyFormData,
        headers: headers,
        url: finalPath,
        method: this.httpMethod.toLowerCase(),
        params
      };

      return configuration;
    },

    getApiKeyData(baseUrl) {
      var entry = this.$store.state.apiKeys.apiKeys.find(
        (item) => item.url === baseUrl
      );
      if (!entry) return null;

      return entry;
    },

    createValidationRules(controls) {
      var validationRules = {};
      controls.forEach((control) => {
        var controlValidations = {};

        if (control.required) {
          controlValidations.required = Validators['required'];
        }
        if (control.minimum) {
          controlValidations.minLength = Validators['minLength'](
            control.minimum
          );
        }
        if (control.maximum) {
          controlValidations.maxLength = Validators['maxLength'](
            control.maximum
          );
        }
        if (control.label === 'email') {
          controlValidations.email = Validators['email'];
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
      formFields.forEach((field) => {
        this.form[field] = null;
      });
    },
    getValidationClass(fieldName) {
      if (!this.$v) return;

      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
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
