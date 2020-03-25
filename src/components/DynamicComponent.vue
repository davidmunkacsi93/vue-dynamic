<template>
  <md-card
    ref="dynamicComponent"
    class="md-layout dynamic-component"
    :class="{ 'component-height': initialized }"
    md-with-hover
  >
    <card-header
      :description="description"
      :initialized="initialized"
      :path="path"
      :uuid="uuid"
    ></card-header>

    <md-card-content
      class="md-layout-item md-size-100"
      :class="{ 'content-height': initialized }"
    >
      <slot :results="results"></slot>
    </md-card-content>

    <md-progress-bar
      v-if="isLoading"
      class="md-layout-item md-size-100"
      md-mode="query"
    ></md-progress-bar>
    <md-card-actions
      class="md-layout-item md-size-100"
      :class="{ 'actions-height': initialized }"
    >
      <md-button type="submit" :form="'form-' + uuid">
        {{ httpMethod }}
      </md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import EventBus from "../utils/event-bus";
import CardHeader from "../components/CardHeader";
import { REQUEST_SUCCESSFUL, REQUEST_FAILED } from "../types/event-types";

export default {
  components: { CardHeader },
  data() {
    return {
      isLoading: false,
      results: []
    };
  },
  props: {
    apiVersion: {
      type: String
    },
    baseURL: {
      type: String
    },
    controls: {
      type: Array
    },
    description: {
      type: String
    },
    httpMethod: {
      type: String
    },
    initialized: {
      type: Boolean
    },
    path: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    uuid: {
      required: true,
      type: String
    }
  },
  methods: {
    callApiMethod() {
      this.isLoading = true;

      var params = {
        t: "Star wars",
        apiKey: "fa42c8b4"
      };
      var configuration = {
        crossDomain: true,
        baseURL: this.baseURL,
        url: this.path,
        method: this.httpMethod.toLowerCase(),
        params
      };

      this.$http
        .request(configuration)
        .then(response => {
          this.isLoading = false;
          this.results = response.data;
          EventBus.$emit(REQUEST_SUCCESSFUL);
        })
        .catch(reason => {
          this.isLoading = false;
          EventBus.$emit(REQUEST_FAILED, { errorMessage: reason.toString() });
        });
    }
  }
};
</script>

<style>
.dynamic-component {
  height: auto;
  width: auto;
  margin: 0px !important;
}
.component-height {
  height: 100%;
}

.content-height {
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow-y: auto;
  height: 60%;
}

.title-height {
  height: auto;
}

.actions-height {
  height: auto;
}
</style>
