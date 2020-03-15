<template>
  <div>
    <div class="md-title">
      <h1>{{ title }} - {{ apiVersion }}</h1>
    </div>
    <div class="md-subtitle" v-if="description">
      <h3>{{ description }}</h3>
    </div>
  </div>
</template>
<script>
import DynamicComponent from "./DynamicComponent.vue";
export default {
  extends: DynamicComponent,
  props: {
    apiVersion: {
      type: String,
      required: true
    },
    controls: {
      type: Array,
      required: false
    },
    httpMethod: {
      type: String,
      required: false
    },
    initialized: {
      type: Boolean,
      required: false
    },
    path: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
};
</script>
<style></style>
