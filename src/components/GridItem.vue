<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { ADJUST_HEIGHT, COMPACT } from "../types/event-types";

export default {
  name: "GridItem",
  extends: GridItem,
  before: function() {
    EventBus.$on(COMPACT, this.compactHandler);
    EventBus.$on(ADJUST_HEIGHT, this.adjustHeight);
  },
  beforeDestroy: function() {
    EventBus.$off(COMPACT, this.compactHandler);
    EventBus.$off(ADJUST_HEIGHT, this.adjustHeight);
  },
  methods: {
    adjustHeight() {
      console.log(this.$refs);
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
