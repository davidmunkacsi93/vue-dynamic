<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { COMPACT, UPDATE_WIDTH } from "../types/event-types";

export default {
  name: "GridItem",
  extends: GridItem,
  created: function() {
    EventBus.$on(COMPACT, this.onCompact);
    EventBus.$on(UPDATE_WIDTH, this.onUpdateWidth);
  },
  beforeDestroy: function() {
    EventBus.$off(COMPACT, this.onCompact);
    EventBus.$off(UPDATE_WIDTH, this.onUpdateWidth);
  },
  props: {
    uuid: {
      required: true,
      type: String
    }
  },
  methods: {
    onCompact() {
      this.compact();
    },
    onUpdateWidth() {
      this.updateWidth(window.innerWidth);
    }
  },
  mounted() {
    console.log("Grid item mounted");
  }
};
</script>

<style>
.vue-grid-item {
  resize: both;
  background: transparent;
  height: auto !important;
}

.vue-grid-item > .vue-resizable-handle {
  z-index: 2;
}
</style>
