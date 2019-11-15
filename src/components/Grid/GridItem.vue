<template>
  <div ref="item" class="grid-item" :style="style">
    <slot>
      <span>{{ this.id }}</span>
    </slot>
  </div>
</template>

<script>
let interact = require("interactjs");

export default {
  name: "GridItem",
  props: {
    id: {
      type: String,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    isDraggable: {
      type: Boolean,
      required: false,
      default: null
    }
  },
  data: function() {
    return {
      columns: 1,
      containerWidth: 100,
      rowHeight: 100,

      isDragging: false,
      draggedPosition: null,

      style: {},

      innerX: this.x,
      innerY: this.y,
      innerWidth: this.width,
      innerHeight: this.height
    };
  },
  mounted: function() {
    this.makeDraggable();
    this.createStyle();
  },
  methods: {
    handleDrag(event) {
      //const position = this.getCurrentPosition(event);

      switch (event.type) {
        case "dragstart": {
          this.isDragging = true;
          this.draggedPosition = this.getNewPosition(event);

          break;
        }
        case "dragend": {
          this.isDragging = false;
          this.draggedPosition = this.getNewPosition(event);
          break;
        }
        case "drag": {
          break;
        }
      }
      this.$emit(
        "moved",
        this.id,
        this.draggedPosition.top,
        this.draggedPosition.left
      );
    },
    makeDraggable() {
      const self = this;

      if (this.interactObject === null || this.interactObject === undefined) {
        this.interactObject = interact(this.$refs.item);
      }

      this.interactObject.draggable({});

      this.interactObject.on("dragstart dragmove dragend", function(event) {
        self.handleDrag(event);
      });
    },
    getCurrentPosition(event) {
      const offsetParent = event.target.offsetParent;
      const offsetParentBoundingRectangle = offsetParent.getBoundingClientRect();

      const x =
        event.clientX +
        offsetParent.scrollLeft -
        offsetParentBoundingRectangle.left;
      const y =
        event.clientY +
        offsetParent.scrollTop -
        offsetParentBoundingRectangle.top;

      return { x, y };
    },

    getNewPosition(event) {
      let newPosition = { top: 0, left: 0 };

      let parentRectangle = event.target.offsetParent.getBoundingClientRect();
      let clientRectangle = event.target.getBoundingClientRect();

      newPosition.left = clientRectangle.left - parentRectangle.left;
      newPosition.top = clientRectangle.top - parentRectangle.top;

      return newPosition;
    },
    createStyle() {
      this.style = {
        top: this.innerX + "px",
        left: this.innerY + "px",
        width: this.containerWidth + "px",
        height: this.rowHeight + "px",
        position: "absolute"
      };
    }
  }
};
</script>

<style>
.grid-item {
  transition: all 200ms ease;
  transition-property: left, top;
  display: block;
  background: green;
}
</style>
