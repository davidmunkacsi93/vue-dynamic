<template>
  <div class="grid-layout">
    <slot></slot>
    <grid-item
      class="grid-placeholder"
      v-show="isDragging"
      :x="placeholder.x"
      :y="placeholder.y"
      :width="placeholder.width"
      :height="placeholder.height"
      :id="placeholder.id"
    ></grid-item>
  </div>
</template>

<script>
import EventBus from "../../utils/event-bus.js";
import GridItem from "./GridItem";

export default {
  name: "GridLayout",
  components: { GridItem },
  props: {
    columnNumber: {
      type: Number,
      default: 12
    },
    rowHeight: {
      type: Number,
      default: 150
    },
    layoutItems: {
      type: Array,
      required: true
    }
  },
  created() {
    const that = this;
    that.dragEventHandler = function(event, id, x, y) {
      that.dragEvent(event, id, x, y);
    };

    EventBus.$on("dragEvent", this.dragEventHandler);
  },
  beforeDestroy() {
    EventBus.$off("dragEvent", this.dragEventHandler);
  },
  data() {
    return {
      isDragging: false,

      placeholder: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: -1
      }
    };
  },
  methods: {
    dragEvent(event, id, x, y) {
      if (event.type === "drag" || event.type === "dragstart") {
        //this.setPlaceholderValues(id, x, y, width, height);
        this.isDragging = true;
      } else {
        this.isDragging = false;
      }

      let layoutItem = this.getLayoutItemById(id);
      layoutItem.x = x;
      layoutItem.y = y;
    },
    getLayoutItemById(id) {
      for (let i = 0, length = this.layoutItems.length; i < length; i++) {
        if (this.layoutItems[i].id === id) return this.layoutItems[i];
      }
    }
    // setPlaceholderValues(id, x, y, width, height) {
    //   this.placeholder.id = id;
    //   this.placeholder.x = x;
    //   this.placeholder.y = y;
    //   this.placeholder.width = width;
    //   this.placeholder.height = height;
    // }
  }
};
</script>

<style>
.grid-layout {
  position: relative;
}
</style>
