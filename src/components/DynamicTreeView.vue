<template>
  <div>
    <dynamic-tree-view-item
      :model="model"
      :currentDepth="0"
    ></dynamic-tree-view-item>
  </div>
</template>

<script>
import DynamicTreeViewItem from './DynamicTreeViewItem';
export default {
  components: {
    DynamicTreeViewItem
  },
  props: {
    model: {
      required: true
    }
  },
  watch: {
    model: function (value) {
      this.model = value;
    }
  }
};
</script>

<style></style>
