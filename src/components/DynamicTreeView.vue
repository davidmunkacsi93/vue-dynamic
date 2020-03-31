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
  }
};
</script>

<style></style>
