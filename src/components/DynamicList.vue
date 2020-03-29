<template>
  <md-list>
    <md-list-item v-for="(value, index) in model" :key="index">
      <span>{{ value }}</span>
    </md-list-item>
  </md-list>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    }
  }
};
</script>

<style></style>
