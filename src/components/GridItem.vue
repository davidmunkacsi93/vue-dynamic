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
  background: grey;
  border: 1px solid;
}
</style>
