<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { COMPACT, UPDATE_WIDTH } from "../types/event-types";
import { SET_API_ITEM_HEIGHT } from "../types/action-types";

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
    initialized: {
      required: true,
      type: Boolean
    },
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
    if (this.initialized) return;

    console.log(this.initialized);
    this.innerH = Math.ceil(this.$el.clientHeight / this.rowHeight);

    this.$store.dispatch(SET_API_ITEM_HEIGHT, {
      uuid: this.uuid,
      height: this.innerH
    });
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
