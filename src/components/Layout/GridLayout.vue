<script>
import { GridLayout } from "vue-grid-layout";
import EventBus from "../../utils/event-bus.js";

export default {
  name: "GridLayout",
  extends: GridLayout,
  created: function() {
    EventBus.$on("gridItemAdded", this.handleGridItemAdded);
  },
  beforeDestroy: function() {
    EventBus.$off("gridItemAdded", this.handleGridItemAdded);
  },
  methods: {
    handleGridItemAdded() {
      this.layoutUpdate();
    }
  }
};
</script>
