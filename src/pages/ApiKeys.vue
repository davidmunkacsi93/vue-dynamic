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
        <api-key-form></api-key-form>
      </div>
    </md-empty-state>
    <template v-if="apiKeys.length > 0">
      <md-list>
        <md-list-item v-for="apiKey in apiKeys" :key="apiKey.key">
          <span>{{ apiKey[0] }}</span>
        </md-list-item>
        <api-key-form></api-key-form>
      </md-list>
    </template>
  </div>
</template>

<script>
import ApiKeyForm from '../components/ApiKeyForm';

export default {
  components: { ApiKeyForm },
  beforeMount() {
    this.apiKeys = this.getApiKeys();
    console.log(this.apiKeys);
  },
  data() {
    return {
      apiKeys: []
    };
  },
  methods: {
    getApiKeys() {
      return Object.entries(this.$store.state.apiKeys.apiKeys);
    }
  }
};
</script>

<style scoped>
.empty-state-span {
  font-size: 16px;
}
</style>
