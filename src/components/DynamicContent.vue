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
    this.$forceNextTick(() => {
      this.autoSizeParent();
    });
    this.autoSizeParent();
  },
  updated() {
    this.$forceNextTick(() => {
      this.autoSizeParent();
    });
  },
  methods: {
    autoSizeParent() {
      if (!this.$parent) return;

      this.$parent.autoSize();
    }
  }
};
</script>
<style>
.dynamic-content {
  margin-top: 10px;
  height: auto;
}
</style>
