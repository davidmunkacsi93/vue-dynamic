<script>
import GridLayout from 'vue-grid-layout';
import GridLayoutBase from '../components/GridLayoutBase';
import EventBus from '../utils/event-bus.js';
import {
  SCREEN_CLASS_CHANGED,
  COMPACT_COMPLETED,
  COMPACT
} from '../types/event-types';
import { SET_API_LAYOUT_ITEMS } from '../types/action-types';

export default {
  mixins: [GridLayoutBase, GridLayout],
  created: function () {
    EventBus.$on(SCREEN_CLASS_CHANGED, this.onScreenClassChanged);
    EventBus.$on(COMPACT, this.onCompact);
  },
  beforeDestroy: function () {
    EventBus.$off(SCREEN_CLASS_CHANGED, this.onScreenClassChanged);
    EventBus.$off(COMPACT, this.onCompact);
  },
  mounted() {
    this.$forceNextTick(() => this.compactLayout());
  },
  methods: {
    onScreenClassChanged() {
      this.$forceNextTick(() => this.compactLayout());
    },
    onCompact() {
      this.$forceNextTick(() => this.compactLayout());
    },
    compactLayout() {
      console.log('Compact');
      if (this.layout.length <= 0) return;

      var correctedLayout = this.correctBounds(this.layout);
      var compactedLayout = this.compact(correctedLayout);
      EventBus.$emit(COMPACT_COMPLETED, compactedLayout);
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
      let collides;
      collides = this.getFirstCollision(compactedItems, l);
      while ((collides = this.getFirstCollision(compactedItems, l))) {
        console.log(collides);
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
      return [].concat(layout).sort(function (a, b) {
        if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
          return 1;
        }
        return -1;
      });
    },

    correctBounds(layout) {
      const corrected = [];
      for (let i = 0, len = layout.length; i < len; i++) {
        const l = layout[i];
        if (l.x + l.w > this.cols) l.x = this.cols - l.w;
        if (l.x < 0) {
          l.x = 0;
          l.w = this.cols;
        }

        while (this.getFirstCollision(corrected, l)) {
          l.y++;
        }
        corrected.push(l);
      }
      return corrected;
    }
  }
};
</script>
