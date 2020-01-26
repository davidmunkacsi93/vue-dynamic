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
    EventBus.$on("gridItemAdded", this.handleGridItemAdded);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);

    EventBus.$off("dragEvent", this.dragEventHandler);
    EventBus.$off("gridItemAdded", this.handleGridItemAdded);
  },
  data() {
    return {
      isDragging: false,
      width: null,

      placeholder: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    columnWidth: function() {
      return this.width / this.columnNumber;
    }
  },
  methods: {
    dragEvent(event, id, x, y) {
      const layoutItem = this.getLayoutItemById(id);
      if (event.type === "dragmove" || event.type === "dragstart") {
        this.isDragging = true;
        this.setPlaceholderValues(
          id,
          layoutItem.x,
          layoutItem.y,
          layoutItem.width,
          layoutItem.height
        );
      } else if (event.type === "dragend") {
        this.isDragging = false;
      } else {
        console.error(
          `Unknown event type ${event.type} in GridLayout.dragEvent`
        );
      }
      this.moveElement(layoutItem, x, y);
      this.compactGridLayout();
      this.resetMoved();
    },
    moveElement(itemToMove, x, y) {
      if (x < 0 || y < 0) return;

      itemToMove.x = x;
      itemToMove.y = y;
      itemToMove.moved = true;

      const collisions = this.getAllCollisions(this.layoutItems, itemToMove);
      if (collisions.length) {
        for (const collision of collisions) {
          if (collision.moved) continue;

          if (itemToMove.y > collision.y + collision.height / 2) {
            this.swapVertically(itemToMove, collision);
          }

          //this.moveElement(collision, collision.x, itemToMove.y + 1);
        }
      }
    },
    swapVertically(layoutItemA, layoutItemB) {
      console.log(layoutItemA.y);
      layoutItemA.y = layoutItemB.y;
      console.log(layoutItemA.y);
      layoutItemB.y = layoutItemA.y + layoutItemB.height;
      console.log(layoutItemB.y);
      console.log(this.layoutItems);
    },
    compactGridLayout() {
      //this.resolveCollisions();
    },
    resolveCollisions() {
      for (var layoutItem of this.layoutItems) {
        while (this.isColliding(this.layoutItems, layoutItem)) {
          let collision = this.getFirstCollision(this.layoutItems, layoutItem);
          layoutItem.y = collision.y + collision.height;
        }
      }
    },
    getBeginningOfTheClosestColumn: function(x) {
      return Math.floor(x / this.columnWidth) * this.columnWidth;
    },
    resetMoved() {
      for (var id in this.layoutItems) {
        this.layoutItems[id].moved = false;
      }
    },
    getLayoutItemById(id) {
      for (let i = 0, length = this.layoutItems.length; i < length; i++) {
        if (this.layoutItems[i].id === id) return this.layoutItems[i];
      }
    },
    getAllCollisions(layout, layoutItem) {
      return layout.filter(item =>
        this.areLayoutItemsColliding(layoutItem, item)
      );
    },
    getFirstCollision(layout, layoutItem) {
      return this.getAllCollisions(layout, layoutItem)[0];
    },
    isColliding(layout, layoutItem) {
      const collisions = this.getAllCollisions(layout, layoutItem);
      return collisions && collisions.length > 0;
    },
    areLayoutItemsColliding(layoutItem, layoutItemToCompare) {
      var layoutItemWidth = layoutItem.width * this.columnWidth;
      var layoutItemToCompareWidth =
        layoutItemToCompare.width * this.columnWidth;

      if (layoutItem.id === layoutItemToCompare.id) return false;
      if (layoutItem.x + layoutItemWidth <= layoutItemToCompare.x) return false;
      if (layoutItem.x >= layoutItemToCompare.x + layoutItemToCompareWidth)
        return false;
      if (layoutItem.y + layoutItem.height <= layoutItemToCompare.y)
        return false;
      if (layoutItem.y >= layoutItemToCompare.y + layoutItemToCompare.height)
        return false;
      return true;
    },
    handleGridItemAdded() {
      this.compactGridLayout();
    },
    onWindowResize() {
      this.width = this.$refs.layout.offsetWidth;
    },
    setPlaceholderValues(id, x, y, width, height) {
      this.placeholder.id = id;
      this.placeholder.x = x;
      this.placeholder.y = y;
      this.placeholder.width = width;
      this.placeholder.height = height;
    }
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
