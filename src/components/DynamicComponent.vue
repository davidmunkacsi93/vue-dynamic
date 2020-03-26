<template>
  <div>
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
    <md-dialog-alert
      :md-active.sync="requestSuccessful"
      md-title="Successful"
      :md-content="successMessage"
      md-confirm-text="Ok"
    />
    <md-dialog-alert
      :md-active.sync="requestFailed"
      md-title="Error"
      :md-content="errorMessage"
      md-confirm-text="Ok"
    />
  </div>
</template>
<script>
import CardHeader from "../components/CardHeader";
import {
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED
} from "../types/event-types";
import { HTTP_GET } from "../types/http-methods";
import EventBus from "../utils/event-bus";

export default {
  components: { CardHeader },
  created() {
    EventBus.$on(REQUEST_FAILED, this.onRequestFailed);
    EventBus.$on(REQUEST_STARTED, this.onRequestStarted);
    EventBus.$on(REQUEST_SUCCESSFUL, this.onRequestSuccessful);
  },
  beforeDestroy() {
    EventBus.$off(REQUEST_FAILED, this.onRequestFailed);
    EventBus.$off(REQUEST_STARTED, this.onRequestStarted);
    EventBus.$off(REQUEST_SUCCESSFUL, this.onRequestSuccessful);
  },
  data() {
    return {
      isLoading: false,

      requestFailed: false,
      requestSuccessful: false,
      errorMessage: "",
      successMessage: "",

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
    onRequestStarted(payload) {
      if (this.uuid !== payload.uuid) return;

      this.isLoading = true;
    },
    onRequestFailed(payload) {
      if (this.uuid !== payload.uuid) return;

      this.isLoading = false;
      this.requestFailed = true;
      this.errorMessage = payload.errorMessage;
    },
    onRequestSuccessful(payload) {
      if (this.uuid !== payload.uuid) return;

      this.isLoading = false;
      if (this.httpMethod != HTTP_GET) {
        this.requestSuccessful = true;
        this.successMessage = payload.successMessage;
      } else {
        this.results = payload.data;
      }
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
