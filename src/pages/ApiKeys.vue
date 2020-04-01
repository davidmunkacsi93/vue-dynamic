<template>
  <div>
    <md-empty-state
      v-if="apiKeys.length === 0"
      class="md-primary"
      md-icon="home"
      md-label="Security comes first!"
      md-description="Add and use your services in one single application."
    >
      <md-button class="md-primary md-raised" to="/addApi">
        Add your first API keys
      </md-button>
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
    apiKeys: [];
  },
  methods: {
    loadApiKeys() {}
  }
};
</script>

<style></style>
