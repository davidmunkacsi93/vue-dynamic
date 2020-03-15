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
  extends: DynamicComponent
};
</script>
<style></style>
