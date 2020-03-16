<script>
import {
  REMOVE_FORM,
  SET_API_ITEM_HEIGHT,
  SET_API_ITEM_WIDTH,
  SET_API_ITEM_INTIAILIZED
} from "../types/action-types";

export default {
  props: {
    apiVersion: {
      type: String
    },
    controls: {
      type: Array
    },
    description: {
      type: String
    },
    httpMethod: {
      type: String
    },
    initialized: {
      type: Boolean
    },
    path: {
      type: String
    },
    title: {
      type: String
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
    console.log("Dynamic component mounted");
    if (!this.initialized) {
      // this.setGridItemHeight();
      this.setGridItemWidth();
      this.$store.dispatch(SET_API_ITEM_INTIAILIZED, this.uuid);
    }
  },
  methods: {
    removeGridItem() {
      this.$store.dispatch(REMOVE_FORM, this.id);
    },
    setGridItemHeight() {
      if (!this.$parent) return;

      var gridItem = this.$parent;
      var rowHeight = this.$parent.rowHeight;

      if (!this.$refs.dynamicComponent) return;
      debugger;
      var dynamicComponent =
        this.$refs.dynamicComponent.$el || this.$refs.dynamicComponent;
      var componentHeight = dynamicComponent.clientHeight;

      if (!componentHeight) return;

      gridItem.innerH = Math.ceil(componentHeight / rowHeight);
      this.$store.dispatch(SET_API_ITEM_HEIGHT, {
        uuid: this.uuid,
        height: gridItem.innerH
      });
    },

    setGridItemWidth() {
      if (!this.$parent) return;

      var gridItem = this.$parent;
      var colWidth = gridItem.containerWidth / gridItem.cols;

      var title = this.$refs.title || this.$refs.title.$el;
      var stringPixelWidth = require("string-pixel-width");
      var fontSize = window.getComputedStyle(title).fontSize.replace(/\D/g, "");
      var textWidth = stringPixelWidth(title.innerText, { size: fontSize });

      var calculatedWidth = Math.ceil(textWidth / colWidth) + 1;
      if (calculatedWidth > gridItem.innerW) {
        gridItem.innerW = calculatedWidth;
        this.$store.dispatch(SET_API_ITEM_WIDTH, {
          uuid: this.uuid,
          width: gridItem.innerW
        });
      }
    }
  }
};
</script>

<style></style>
