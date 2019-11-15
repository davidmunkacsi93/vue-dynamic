<template>
  <div class="grid-layout">
    <slot></slot>
  </div>
</template>

<script>
import EventBus from "../../utils/event-bus.js";

export default {
  name: "GridLayout",

  created() {
    const that = this;
    that.dragEventHandler = function(event, id) {
      that.dragEvent(event, id);
    };

    EventBus.$on("dragEvent", this.dragEventHandler);
  },
  beforeDestroy() {
    EventBus.$off("dragEvent", this.dragEventHandler);
  },
  methods: {
    dragEvent: function(event, id) {
      console.log("GridLayout: " + id + " dragged.");
    }
  }
};
</script>

<style>
.grid-layout {
  position: relative;
}
</style>
