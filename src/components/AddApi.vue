<template>
  <div>
    <md-field>
      <label>API specification URL</label>
      <md-input v-model="specificationURL" type="text"></md-input>
    </md-field>
    <md-button @click="addApi"></md-button>
  </div>
</template>
<script>
import ApiIntegrationService from "../services/api-integration-service";

export default {
  data() {
    return {
      specificationURL: null
    };
  },
  methods: {
    addApi() {
      ApiIntegrationService.getSwaggerSpecification(this.specificationURL);
    }
  }
};
</script>
<style></style>
