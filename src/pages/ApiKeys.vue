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
        <form class="md-layout">
          <md-field class="md-size-100">
            <label>URL</label>
            <md-input v-model="url" type="text"></md-input>
          </md-field>
          <md-field class="md-size-100">
            <label>API key</label>
            <md-input v-model="apiKey" type="password"></md-input>
          </md-field>
          <md-button class="md-primary" type="submit">Add</md-button>
        </form>
      </div>
    </md-empty-state>
    <template v-if="apiKeys.length > 0"> </template>
  </div>
</template>

<script>
export default {
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
  methods: {
    loadApiKeys() {}
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
