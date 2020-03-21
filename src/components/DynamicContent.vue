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
      this.setParentHeight();
    });
  },
  updated() {
    this.$forceNextTick(() => {
      this.setParentHeight();
    });
  },
  methods: {
    setParentHeight() {
      if (!this.$parent) return;

      // this.$parent.setHeightAuto();
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
