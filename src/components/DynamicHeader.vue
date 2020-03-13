<template>
  <div>
    <div class="md-title">
      <h1>{{ apiModel.title }} - {{ apiModel.apiVersion }}</h1>
    </div>
    <div class="md-subtitle" v-if="apiModel.description">
      <h3>{{ apiModel.description }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    apiVersion: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>
<style></style>
