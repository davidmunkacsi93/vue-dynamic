<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { COMPACT, ADJUST_ITEM } from "../types/event-types";

export default {
  name: "GridItem",
  extends: GridItem,
  created: function() {
    EventBus.$on(ADJUST_ITEM, this.adjustItem);
    EventBus.$on(COMPACT, this.compactHandler);
  },
  beforeDestroy: function() {
    EventBus.$off(ADJUST_ITEM, this.adjustItem);
    EventBus.$off(COMPACT, this.compactHandler);
  },
  methods: {
    adjustItem(childComponent) {
      if (this.i != childComponent.id) return;
      this.innerH = childComponent.element.clientHeight / this.rowHeight;
    }
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
