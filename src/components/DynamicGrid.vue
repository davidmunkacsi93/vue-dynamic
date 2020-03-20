<template>
  <div>
    <span>Dynamic Grid</span>
  </div>
</template>

<script>
export default {
  props: {
    gridModel: {
      type: Object,
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
