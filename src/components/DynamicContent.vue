<template>
  <md-content>
    <router-view> </router-view>
  </md-content>
</template>
<script>
export default {
  props: {
    x: {
      required: true,
      type: Number
    },
    y: {
      required: true,
      type: Number
    }
  }
};
</script>
<style>
.md-content {
  height: 100%;
}
</style>
