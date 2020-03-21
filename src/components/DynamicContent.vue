<template>
  <md-content class="dynamic-content">
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
.dynamic-content {
  margin-top: 10px;
  height: 100%;
}
</style>
