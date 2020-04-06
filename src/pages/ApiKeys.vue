<template>
  <div class="api-keys-content">
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
    <div class="md-layout" v-if="apiKeys.length > 0">
      <dynamic-table
        class="md-layout-item md-size-100"
        :model="apiKeys"
      ></dynamic-table>
      <api-key-form class="md-layout-item md-size-50"></api-key-form>
    </div>
  </div>
</template>

<script>
import ApiKeyForm from '../components/ApiKeyForm';
import DynamicTable from '../components/DynamicTable';
import ApiKeysRepository from '../repositories/api-keys-repository';

export default {
  components: { ApiKeyForm, DynamicTable },
  beforeMount() {
    ApiKeysRepository.loadApiKeys()
      .then((apiKeys) => {
        this.apiKeys = apiKeys;
      })
      .catch((reject) => {
        console.error(reject);
      });
  },
  data() {
    return {
      apiKeys: []
    };
  }
};
</script>

<style scoped>
.api-keys-content {
  padding: 10px;
}
.empty-state-span {
  font-size: 16px;
}
</style>
