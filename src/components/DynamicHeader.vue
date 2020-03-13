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
export default {
  props: {
    apiVersion: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>
<style></style>
