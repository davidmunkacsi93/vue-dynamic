<template>
  <div ref="item" class="grid-item">
    <slot>Placeholder</slot>
  </div>
</template>

<script>
let interact = require("interactjs");

export default {
  name: "GridItem",
  props: {
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
      isDragging: false,
      draggedPosition: null
    };
  },
  mounted: function() {
    this.makeDraggable();
  },
  methods: {
    handleDrag(event) {
      const startingPosition = this.getCurrentPosition(event);

      switch (event.type) {
        case "dragstart": {
          this.isDragging = true;
          this.draggedPosition = getNewPosition(event);

          break;
        }
        case "dragend": {
          this.isDragging = false;
          this.draggedPosition = getNewPosition(event);

          break;
        }
        case "drag": {
          break;
        }
      }
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
    }
  }
};
</script>

<style>
.grid-item {
  display: block;
}
</style>
