<script>
import { GridLayout } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";

export default {
  name: "GridLayout",
  extends: GridLayout,
  created: function() {
    EventBus.$on("gridItemAdded", this.handleGridItemAdded);
    EventBus.$on("layoutUpdated", this.handleLayoutUpdated);
  },
  beforeDestroy: function() {
    EventBus.$off("gridItemAdded", this.handleGridItemAdded);
    EventBus.$off("layoutUpdated", this.handleLayoutUpdated);
  },
  methods: {
    handleGridItemAdded() {
      this.layoutUpdate();
    },
    handleLayoutUpdated() {
      console.log(this.$data);
      this.layoutUpdate();
    }
  }
};
</script>
