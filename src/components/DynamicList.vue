<template>
  <md-list>
    <md-list-item v-for="(value, index) in values" :key="index">
      <span>{{ value }}</span>
    </md-list-item>
  </md-list>
</template>

<script>
export default {
  props: {
    listType: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
