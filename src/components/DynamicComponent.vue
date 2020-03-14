<template>
  <div>
    <canvas ref="canvas" width="0" height="0"></canvas>
  </div>
</template>

<script>
import {
  REMOVE_FORM,
  SET_API_ITEM_HEIGHT,
  SET_API_ITEM_WIDTH,
  SET_API_ITEM_INTIAILIZED
} from "../types/action-types";

export default {
  props: {
    apiName: {
      type: String,
      required: false
    },
    controls: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    httpMethod: {
      type: String,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (!this.initialized) {
      this.setGridItemHeight();
      this.setGridItemWidth();
      this.$store.dispatch(SET_API_ITEM_INTIAILIZED, this.$parent.$attrs.uuid);
    }
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    removeGridItem() {
      this.$store.dispatch(REMOVE_FORM, this.id);
    },
    setGridItemHeight() {
      var gridItem = this.$parent;
      var rowHeight = this.$parent.rowHeight;
      var cardHeight = this.$refs.dynamicForm.$el.clientHeight;
      gridItem.innerH = Math.ceil(cardHeight / rowHeight);
      this.$store.dispatch(SET_API_ITEM_HEIGHT, {
        uuid: gridItem.$attrs.uuid,
        height: gridItem.innerH
      });
    },
    setGridItemWidth() {
      var gridItem = this.$parent;
      var canvas = this.$refs.canvas;
      var context = canvas.getContext("2d");
      context.font = "bold 24px Roboto";

      var textMetrics = context.measureText(this.$refs.cardTitle.innerText);
      var colWidth = gridItem.containerWidth / gridItem.cols;
      var calculatedWidth = Math.ceil(textMetrics.width / colWidth);
      if (calculatedWidth > gridItem.innerW) {
        gridItem.innerW = calculatedWidth;
        this.$store.dispatch(SET_API_ITEM_WIDTH, {
          uuid: gridItem.$attrs.uuid,
          width: gridItem.innerW
        });
      }
    }
  }
};
</script>

<style></style>
