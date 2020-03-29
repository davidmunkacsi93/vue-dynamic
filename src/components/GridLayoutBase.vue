<script>
import { GridLayout } from 'vue-grid-layout';
import EventBus from '../utils/event-bus.js';
import { LAYOUT_UPDATED } from '../types/event-types';

export default {
  extends: GridLayout,
  created: function () {
    EventBus.$on(LAYOUT_UPDATED, this.onLayoutUpdated);
  },
  beforeDestroy: function () {
    EventBus.$off(LAYOUT_UPDATED, this.onLayoutUpdated);
  },
  methods: {
    onLayoutUpdated() {
      this.layoutUpdate();
    }
  }
};
</script>
