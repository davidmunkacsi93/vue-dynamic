<script>
import { GridItem } from "vue-grid-layout";
import EventBus from "../utils/event-bus.js";
import { COMPACT, UPDATE_WIDTH } from "../types/event-types";
import {
  SET_API_ITEM_HEIGHT,
  SET_API_ITEM_WIDTH,
  SET_API_ITEM_INTIAILIZED
} from "../types/action-types";
import stringPixelWidth from "string-pixel-width";

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
  mounted() {
    if (this.initialized) return;

    setTimeout(() => {
      this.setGridItemWidth();
      this.setGridItemHeight();
      this.$store.dispatch(SET_API_ITEM_INTIAILIZED, this.uuid);
    }, 200);
  },
  methods: {
    onCompact() {
      this.compact();
    },
    onUpdateWidth() {
      this.updateWidth(window.innerWidth);
    },
    setGridItemHeight() {
      var calculatedHeight = Math.floor(
        this.$children[0].$el.offsetHeight / this.rowHeight
      );

      if (calculatedHeight > this.innerH) {
        this.innerH = calculatedHeight;

        this.$store.dispatch(SET_API_ITEM_HEIGHT, {
          uuid: this.uuid,
          height: this.innerH
        });
      }
    },
    setGridItemWidth() {
      if (
        !this.$children[0] ||
        !this.$children[0].$refs ||
        !this.$children[0].$refs.title
      )
        return;

      var title = this.$children[0].$refs.title;
      var colWidth = this.containerWidth / this.cols;
      var fontSize = window.getComputedStyle(title).fontSize.replace(/\D/g, "");
      var textWidth = stringPixelWidth(title.innerText, { size: fontSize });
      var calculatedWidth = Math.ceil(textWidth / colWidth) + 2;

      if (calculatedWidth > this.innerW) {
        this.innerW = calculatedWidth;
        this.$store.dispatch(SET_API_ITEM_WIDTH, {
          uuid: this.uuid,
          width: this.innerW
        });
      }
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
}
</style>
