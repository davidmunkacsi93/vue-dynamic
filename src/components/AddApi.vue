<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-60">
      <md-field>
        <label>API specification URL</label>
        <md-input v-model="specificationURL" type="text"></md-input>
      </md-field>
      <md-button class="md-raised md-primary" @click="addApi">Add</md-button>
    </div>
  </div>
</template>
<script>
import ApiIntegrationService from "../services/api-integration-service";
import { ADD_NEW_API } from "../types/action-types";

export default {
  data() {
    return {
      specificationURL:
        "https://api.swaggerhub.com/apis/davidmunkacsi93/home-iot-api/1.0.0/swagger.json"
    };
  },
  methods: {
    addApi() {
      ApiIntegrationService.integrateNewAPI(this.specificationURL)
        .then(apiModel => {
          this.$store.dispatch(ADD_NEW_API, apiModel);
        })
        .catch(reason => console.error(reason));
    }
  }
};
</script>
<style></style>
