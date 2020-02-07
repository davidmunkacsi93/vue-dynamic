<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";

export default {
  name: "GridItem",
  extends: GridItem,
  created: function() {
    EventBus.$on("compact", this.compactHandler);
  },
  beforeDestroy: function() {
    EventBus.$off("compact", this.compactHandler);
  }
};
</script>

<style>
.vue-grid-item {
  resize: both;
  background: transparent;
}

.vue-grid-item > .vue-resizable-handle {
  color: white;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  border-spacing: 10px !important;
  background: none !important;
  width: 10px !important;
  height: 10px !important;
  z-index: 2;
}
</style>
