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
