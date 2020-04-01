<template>
  <div>
    <md-empty-state
      v-if="apiKeys.length === 0"
      class="md-primary"
      md-icon="vpn_key"
      md-label="Security comes first!"
      md-description="To use your services, they often required an additional api key for authentication. You can register them here for a specific URL."
    >
      <div>
        <span class="empty-state-span">Go on and add your first key! </span>
        <form
          novalidate
          class="md-layout"
          @submit.prevent="validateForm"
          id="form"
        >
          <md-field class="md-size-100" :class="getValidationClass('url')">
            <label for="url">URL</label>
            <md-input id="url" v-model="form.url" type="text"></md-input>
            <span class="md-error" v-if="$v.form.url.required === false">
              URL is required.
            </span>
            <span class="md-error" v-if="$v.form.url.url === false">
              Invalid format.
            </span>
          </md-field>
          <md-field class="md-size-100" :class="getValidationClass('apiKey')">
            <label for="apiKey">API key</label>
            <md-input
              id="apiKey"
              v-model="form.apiKey"
              type="password"
            ></md-input>
            <span class="md-error" v-if="$v.form.apiKey.required === false">
              API key is required.
            </span>
          </md-field>
          <md-button class="md-raised md-primary" type="submit">Add</md-button>
        </form>
      </div>
    </md-empty-state>
    <template v-if="apiKeys.length > 0"> </template>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';
import { ADD_API_KEY } from '../types/action-types';

export default {
  mixins: [validationMixin],
  beforeMount() {
    this.loadApiKeys();
  },
  data() {
    return {
      form: {
        url: null,
        apiKey: null
      },
      apiKeys: []
    };
  },
  validations: {
    form: {
      apiKey: {
        required
      },
      url: {
        required,
        url
      }
    }
  },
  methods: {
    addApiKey() {
      var payload = {
        apiKey: this.form.apiKey,
        url: this.form.url
      };
      this.$store.dispatch(ADD_API_KEY, payload);
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
    loadApiKeys() {},
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.addApiKey();
      }
    }
  }
};
</script>

<style scoped>
.empty-state-span {
  font-size: 16px;
}

.md-layout {
  margin-top: 20px;
}
</style>
