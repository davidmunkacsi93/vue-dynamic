<template>
  <div class="md-layout">
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
      :md-active.sync="error"
      md-title="API could not be integrated"
      :md-content="errorContent"
      md-confirm-text="Ok"
    />
  </div>
</template>
<script>
import { ADD_NEW_API } from "../types/action-types";
import { API_ADDED } from "../types/event-types";

import EventBus from "../utils/event-bus";
import ApiIntegrationService from "../services/api-integration-service.js";

export default {
  data() {
    return {
      loading: false,
      error: false,
      errorContent: null,
      apiCreated: false,
      apiTitle: null,
      specificationURL:
        "https://api.swaggerhub.com/apis/davidmunkacsi93/petstore/1.0.0/swagger.json"
    };
  },
  methods: {
    addApi() {
      this.loading = true;

      ApiIntegrationService.integrateNewAPI(this.specificationURL)
        .then(apiModel => {
          this.$store.dispatch(ADD_NEW_API, apiModel);
          this.apiTitle = apiModel.title;
          this.loading = false;
          this.apiCreated = true;
          EventBus.$emit(API_ADDED);
        })
        .catch(reason => {
          this.loading = false;
          this.error = true;
          this.errorContent = reason.toString();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.md-layout {
  margin-top: 10px;
}
</style>
