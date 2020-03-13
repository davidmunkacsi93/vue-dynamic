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
import { ADD_NEW_API } from "../types/action-types";
import EventBus from "../utils/event-bus";
import { API_ADDED } from "../types/event-types";

import SwaggerParser from "swagger-parser";
import OpenApi2Parser from "../parsers/open-api-2-parser.js";
import OpenApi3Parser from "../parsers/open-api-3-parser.js";

export default {
  data() {
    return {
      specificationURL:
        "https://api.swaggerhub.com/apis/davidmunkacsi93/petstore/1.0.0/swagger.json"
    };
  },
  methods: {
    addApi() {
      this.integrateNewAPI(this.specificationURL)
        .then(apiModel => {
          this.$store.dispatch(ADD_NEW_API, apiModel);
          EventBus.$emit(API_ADDED);
        })
        .catch(reason => console.error(reason));
    },
    async integrateNewAPI(url) {
      return SwaggerParser.validate(url)
        .then(async () => {
          let parsedSpecification = await SwaggerParser.parse(url);
          if (parsedSpecification.swagger === "2.0") {
            return OpenApi2Parser.processSpecification(parsedSpecification);
          } else if (parsedSpecification.openapi === "3.0.0") {
            return OpenApi3Parser.processSpecification(parsedSpecification);
          } else {
            console.error("Unknown specification or version detected.");
          }
        })
        .catch(reason => {
          console.error(reason);
        });
    }
  }
};
</script>
<style></style>
