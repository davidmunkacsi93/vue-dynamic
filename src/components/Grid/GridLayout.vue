<template>
  <div class="grid-layout" ref="layout">
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
  mounted() {
    this.onWindowResize();
  },
  created() {
    const that = this;
    that.dragEventHandler = function(event, id, x, y) {
      that.dragEvent(event, id, x, y);
    };

    window.addEventListener("resize", this.onWindowResize);

    EventBus.$on("dragEvent", this.dragEventHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);

    EventBus.$off("dragEvent", this.dragEventHandler);
  },
  data() {
    return {
      isDragging: false,
      width: null,

      placeholder: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: -1
      }
    };
  },
  computed: {
    columnWidth: function() {
      return this.width / this.columnNumber;
    }
  },
  methods: {
    dragEvent(event, id, x, y, width, height) {
      if (event.type === "drag" || event.type === "dragstart") {
        //this.setPlaceholderValues(id, x, y, width, height);
        this.isDragging = true;
      } else {
        this.isDragging = false;
      }
      let layoutItem = this.getLayoutItemById(id);
      this.moveElement(layoutItem, x, y, width, height);
    },
    moveElement(layoutItem, x, y) {
      layoutItem.x = x;
      layoutItem.y = y;
      layoutItem.moved = true;

      var collisions = this.getAllCollisions(layoutItem);
      console.log(collisions);
      if (collisions.length > 0) {
        for (var id in collisions) {
          const collision = collisions[id];
          console.log(collision)
          if (collision.moved) continue;

          this.moveElement(collision, collision.x, layoutItem.y + 1);
        }
      }
    },
    getLayoutItemById(id) {
      for (let i = 0, length = this.layoutItems.length; i < length; i++) {
        if (this.layoutItems[i].id === id) return this.layoutItems[i];
      }
    },
    getAllCollisions(layoutItem) {
      return this.layoutItems.filter(item =>
        this.areLayoutItemsColliding(layoutItem, item)
      );
    },
    areLayoutItemsColliding(layoutItem, layoutItemToCompare) {
      var layoutItemWidth = layoutItem.width * this.columnWidth;
      var layoutItemHeight = layoutItem.height * this.rowHeight;
      var layoutItemToCompareWidth =
        layoutItemToCompare.width * this.columnWidth;
      var layoutItemToCompareHeight =
        layoutItemToCompare.height * this.rowHeight;

      if (layoutItem.id == layoutItemToCompare.id) return false;
      if (layoutItem.x + layoutItemWidth <= layoutItemToCompare.x) return false;
      if (layoutItem.x >= layoutItemToCompare.x + layoutItemToCompareWidth)
        return false;
      if (layoutItem.y + layoutItemHeight <= layoutItemToCompare.y)
        return false;
      if (layoutItem.y >= layoutItemToCompare.y + layoutItemToCompareHeight)
        return false;
      return true;
    },
    onWindowResize() {
      this.width = this.$refs.layout.offsetWidth;
    }
    // setPlaceholderValues(id, x, y, width, height) {
    //   this.placeholder.id = id;
    //   this.placeholder.x = x;
    //   this.placeholder.y = y;
    //   this.placeholder.width = width;
    //   this.placeholder.height = height;
    // }
  },
  watch: {
    width: function(value) {
      this.width = value;
      EventBus.$emit("updateLayoutWidth", this.width);
    }
  }
};
</script>

<style>
.grid-layout {
  position: relative;
}
</style>
