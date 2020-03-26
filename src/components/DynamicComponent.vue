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
import CardHeader from "../components/CardHeader";

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
