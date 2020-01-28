<script>
import { GridLayout } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";

export default {
  name: "GridLayout",
  extends: GridLayout,
  created: function() {
    EventBus.$on("layoutUpdated", this.handleLayoutUpdated);
  },
  beforeDestroy: function() {
    EventBus.$off("layoutUpdated", this.handleLayoutUpdated);
  },
  methods: {
    handleLayoutUpdated() {
      console.log(this.$data);
      this.layoutUpdate();
    }
  }
};
</script>
