<template>
  <form novalidate class="md-layout" @submit.prevent="validateForm" id="form">
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
      <md-input id="apiKey" v-model="form.apiKey" type="password"></md-input>
      <span class="md-error" v-if="$v.form.apiKey.required === false">
        API key is required.
      </span>
    </md-field>
    <md-button class="md-raised md-primary" type="submit">Add</md-button>
  </form>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators';
import { ADD_API_KEY } from '../types/action-types';

export default {
  data() {
    return {
      form: {
        url: null,
        apiKey: null
      }
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
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.addApiKey();
      }
    }
  }
};
</script>

<style>
.md-layout {
  margin-top: 20px;
}
</style>
