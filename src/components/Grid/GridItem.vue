<template>
  <div class="grid-item">
    <slot>Placeholder</slot>
  </div>
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
    },
    isDraggable: {
      type: Boolean,
      required: false,
      default: null
    }
  }
};
</script>

<style>
.grid-item {
  display: block;
}
</style>