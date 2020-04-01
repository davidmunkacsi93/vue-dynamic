<template>
  <div class="add-api-content md-layout">
    <md-progress-bar
      v-show="loading"
      class="md-layout-item md-size-100"
      md-mode="query"
    ></md-progress-bar>
    <div
      class="md-layout-item md-large-size-60 md-medium-size-70 md-small-size-100"
    >
      <md-field>
        <label>API specification URL</label>
        <md-input v-model="specificationURL" type="text"></md-input>
      </md-field>
      <md-button class="md-raised md-primary" @click="addApi">Add</md-button>
    </div>
    <md-dialog-alert
      :md-active.sync="apiCreated"
      md-title="API integrated"
      :md-content="'New API for ' + this.apiTitle + ' created.'"
      md-confirm-text="Ok"
    />
    <md-dialog-alert
      :md-active.sync="isNotValid"
      md-title="API could not be added"
      :md-content="errorMessage"
      md-confirm-text="Ok"
    />
  </div>
</template>
<script>
import { ADD_NEW_API } from '../types/action-types';
import { API_ADDED } from '../types/event-types';

import EventBus from '../utils/event-bus';

export default {
  data() {
    return {
      loading: false,
      isNotValid: false,
      errorMessage: null,
      apiCreated: false,
      apiTitle: null,
      specificationURL:
        'https://api.swaggerhub.com/apis/davidmunkacsi93/petstore/1.0.0/swagger.json'
    };
  },
  methods: {
    addApi() {
      this.loading = true;

      this.$apiIntegrationService
        .integrateNewAPI(this.specificationURL)
        .then((apiModel) => {
          this.$store.dispatch(ADD_NEW_API, apiModel);
          this.apiTitle = apiModel.title;
          this.loading = false;
          this.apiCreated = true;
          EventBus.$emit(API_ADDED);
        })
        .catch((reason) => {
          this.loading = false;
          this.isNotValid = true;
          this.errorMessage = reason.toString();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-api-content {
  margin-top: 10px;
  padding: 10px;
}
</style>
