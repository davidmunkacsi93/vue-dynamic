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
          <md-field class="md-size-100">
            <label for="url">URL</label>
            <md-input id="url" v-model="url" type="text"></md-input>
          </md-field>
          <md-field class="md-size-100">
            <label for="apiKey">API key</label>
            <md-input id="apiKey" v-model="apiKey" type="password"></md-input>
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

export default {
  mixins: [validationMixin],
  beforeMount() {
    this.loadApiKeys();
  },
  data() {
    return {
      url: null,
      apiKey: null,
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
  mounted() {
    console.log(this.$v);
  },
  methods: {
    addApiKey() {
      console.log('Add api key...');
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
