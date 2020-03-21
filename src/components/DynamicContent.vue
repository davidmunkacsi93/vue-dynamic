<template>
  <md-content class="dynamic-content">
    <router-view></router-view>
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
  },
  mounted() {
    this.autoSizeParent();
  },
  updated() {
    this.autoSizeParent();
  },
  methods: {
    autoSizeParent() {
      if (!this.$parent) return;

      setTimeout(() => {
        this.$parent.autoSize();
      }, 3000);
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
