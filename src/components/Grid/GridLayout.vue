<template>
  <div class="grid-layout">
    <slot></slot>
  </div>
</template>

<script>
import EventBus from "../../utils/event-bus.js";

export default {
  name: "GridLayout",
  props: {
    layoutItems: {
      type: Array,
      required: true
    }
  },
  created() {
    const that = this;
    that.dragEventHandler = function(event, id, x, y) {
      that.dragEvent(event, id, x, y);
    };

    EventBus.$on("dragEvent", this.dragEventHandler);
  },
  beforeDestroy() {
    EventBus.$off("dragEvent", this.dragEventHandler);
  },
  methods: {
    dragEvent: function(event, id, x, y) {
      //moveElement(x, y);
    }
  }
};
</script>

<style>
.grid-layout {
  position: relative;
}
</style>
