<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { COMPACT } from "../types/event-types";

export default {
  name: "GridItem",
  extends: GridItem,
  created: function() {
    EventBus.$on(COMPACT, this.compactHandler);
  },
  beforeDestroy: function() {
    EventBus.$off(COMPACT, this.compactHandler);
  }
};
</script>

<style>
.vue-grid-item {
  resize: both;
  background: transparent;
}

.vue-grid-item > .vue-resizable-handle {
  z-index: 2;
}
</style>
