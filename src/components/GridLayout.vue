<script>
import { GridLayout } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { LAYOUT_UPDATED } from "../types/event-types";

export default {
  name: "GridLayout",
  extends: GridLayout,
  created: function() {
    EventBus.$on(LAYOUT_UPDATED, this.handleLayoutUpdated);
  },
  beforeDestroy: function() {
    EventBus.$off(LAYOUT_UPDATED, this.handleLayoutUpdated);
  },
  mounted() {
    this.layoutUpdate();
  },
  methods: {
    handleLayoutUpdated() {
      this.layoutUpdate();
    },
    getLayouts() {
      return this.layouts;
    }
  }
};
</script>
