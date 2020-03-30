<template>
  <div>
    <dynamic-tree-view-item
      :model="model"
      :currentDepth="0"
    ></dynamic-tree-view-item>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    }
  },
  watch: {
    model: function (value) {
      this.model = value;
      console.log(this.model);
    }
  }
};
</script>

<style></style>
