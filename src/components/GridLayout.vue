<script>
import { GridLayout } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { LAYOUT_UPDATED, UPDATE_WIDTH } from "../types/event-types";
import { SET_API_LAYOUT_ITEMS } from "../types/action-types";

export default {
  name: "GridLayout",
  extends: GridLayout,
  props: {
    compactRequired: {
      type: Boolean,
      required: true
    }
  },
  created: function() {
    EventBus.$on(LAYOUT_UPDATED, this.handleLayoutUpdated);
  },
  beforeDestroy: function() {
    EventBus.$off(LAYOUT_UPDATED, this.handleLayoutUpdated);
  },
  mounted() {
    if (this.compactRequired) {
      setTimeout(() => {
        var compactedLayout = this.compact(this.layout);
        this.$store.dispatch(SET_API_LAYOUT_ITEMS, compactedLayout);
      }, 1000);
    }
  },
  methods: {
    handleLayoutUpdated() {
      this.layoutUpdate();
    },
    compact(layout) {
      const compactedItems = [];
      const sorted = this.sortLayoutItemsByRowCol(layout);
      const out = Array(layout.length);

      for (let i = 0, len = sorted.length; i < len; i++) {
        let l = sorted[i];
        let compacted = this.compactItem(compactedItems, l);
        compactedItems.push(compacted);
        out[layout.indexOf(l)] = l;

        l.moved = false;
      }

      return out;
    },

    compactItem(compactedItems, l) {
      while (l.y > 0 && !this.getFirstCollision(compactedItems, l)) {
        l.y--;
      }

      let collides;
      while ((collides = this.getFirstCollision(compactedItems, l))) {
        l.y = collides.y + collides.h;
      }
      return l;
    },

    getFirstCollision(layout, layoutItem) {
      for (let i = 0, len = layout.length; i < len; i++) {
        if (this.collides(layout[i], layoutItem)) return layout[i];
      }
    },

    collides(l1, l2) {
      if (l1 === l2) return false;
      if (l1.x + l1.w <= l2.x) return false;
      if (l1.x >= l2.x + l2.w) return false;
      if (l1.y + l1.h <= l2.y) return false;
      if (l1.y >= l2.y + l2.h) return false;
      return true;
    },
    sortLayoutItemsByRowCol(layout) {
      return [].concat(layout).sort(function(a, b) {
        if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
          return 1;
        }
        return -1;
      });
    }
  }
};
</script>
