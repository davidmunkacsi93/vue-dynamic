<script>
import { GridItem } from 'vue-grid-layout';
import EventBus from '../utils/event-bus.js';
import {
  COMPACT,
  UPDATE_WIDTH,
  SCREEN_CLASS_CHANGED,
  AUTO_SIZE_COMPLETED
} from '../types/event-types';
import { SET_API_ITEM_SIZE } from '../types/action-types';

export default {
  name: 'GridItem',
  extends: GridItem,
  created: function () {
    EventBus.$on(COMPACT, this.onCompact);
    EventBus.$on(UPDATE_WIDTH, this.onUpdateWidth);
  },
  beforeDestroy: function () {
    EventBus.$off(COMPACT, this.onCompact);
    EventBus.$off(UPDATE_WIDTH, this.onUpdateWidth);
  },
  props: {
    autoSizeRequired: {
      default: true,
      required: false,
      type: Boolean
    },
    initialized: {
      required: true,
      type: Boolean
    },
    type: {
      type: String
    },
    uuid: {
      required: true,
      type: String
    }
  },
  mounted() {
    if (this.autoSizeRequired && !this.initialized) {
      this.$forceNextTick(() => this.autoSize());
    }
  },
  methods: {
    onCompact() {
      this.compact();
    },

    onUpdateWidth() {
      this.updateWidth(window.innerWidth);
    },

    autoSize() {
      this.previousW = this.innerW;
      this.previousH = this.innerH;

      let newSize = this.$slots.default[0].elm.getBoundingClientRect();
      newSize.height = newSize.height + 100;
      let pos = this.calcWH(newSize.height, newSize.width);

      if (pos.w < this.minW) {
        pos.w = this.minW;
      }
      if (pos.w > this.maxW) {
        pos.w = this.maxW;
      }
      if (pos.h < this.minH) {
        pos.h = this.minH;
      }
      if (pos.h > this.maxH) {
        pos.h = this.maxH;
      }

      if (pos.h < 1) {
        pos.h = 1;
      }
      if (pos.w < 1) {
        pos.w = 1;
      }

      if (this.innerW !== pos.w || this.innerH !== pos.h) {
        this.$emit(
          'resize',
          this.i,
          pos.h,
          pos.w,
          newSize.height,
          newSize.width
        );
      }
      if (this.previousW !== pos.w || this.previousH !== pos.h) {
        this.$emit(
          'resized',
          this.i,
          pos.h,
          pos.w,
          newSize.height,
          newSize.width
        );
        this.eventBus.$emit(
          'resizeEvent',
          'resizeend',
          this.i,
          this.innerX,
          this.innerY,
          pos.h,
          pos.w
        );
      }

      var payload = {
        uuid: this.uuid,
        x: this.innerX,
        y: this.innerY,
        w: pos.w,
        h: pos.h
      };
      EventBus.$emit(AUTO_SIZE_COMPLETED, payload);
    }
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
  height: 25%;
  width: 20%;
}
</style>
