<template>
  <div class="grid-item">Grid Item</div>
</template>

<script>
export default {
  name: "GridItem",
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.grid-item {
  display: block;
}
</style>