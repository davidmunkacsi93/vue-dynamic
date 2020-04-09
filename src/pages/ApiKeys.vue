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
      <api-key-form
        class="md-layout-item md-size-50 md-small-size-100"
      ></api-key-form>
    </div>
  </div>
</template>

<script>
import ApiKeyForm from '../components/ApiKeyForm';
import DynamicTable from '../components/DynamicTable';
import ApiKeyRepository from '../repositories/api-key-repository';
import EventBus from '../utils/event-bus';
import { API_KEY_ADDED } from '../types/event-types';

export default {
  components: { ApiKeyForm, DynamicTable },
  created() {
    EventBus.$on(API_KEY_ADDED, this.loadApiKeys);
  },
  beforeDestroy() {
    EventBus.$off(API_KEY_ADDED, this.loadApiKeys);
  },
  beforeMount() {
    this.loadApiKeys();
  },
  data() {
    return {
      apiKeys: []
    };
  },
  methods: {
    loadApiKeys() {
      ApiKeyRepository.loadApiKeys()

        .then((apiKeys) => {
          this.apiKeys = apiKeys;
        })
        .catch((reject) => {
          throw new Error(reject);
        });
    }
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
