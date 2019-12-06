<template>
  <div ref="item" class="grid-item" :style="style">
    <slot>
      <span>{{ this.id }}</span>
    </slot>
  </div>
</template>

<script>
import EventBus from "../../utils/event-bus.js";

let interact = require("interactjs");

export default {
  name: "GridItem",
  props: {
    id: {
      type: Number,
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
  data() {
    return {
      columnNumber: 12,
      layoutWidth: null,

      isDragging: false,
      draggedPosition: null,

      style: {},

      previousX: null,
      previousY: null,
      lastX: null,
      lastY: null,

      innerX: this.x,
      innerY: this.y,
      innerWidth: this.width,
      innerHeight: this.height
    };
  },
  mounted: function() {
    this.columnNumber = this.$parent.columnNumber;
    this.layoutWidth = this.$parent.width;
    console.log(this.layoutWidth);
    this.makeDraggable();
    this.createStyle();
  },
  created: function() {
    EventBus.$on("updateLayoutWidth", this.handleUpdateLayoutWidth);
  },
  beforeDestroy: function() {
    EventBus.$off("updateLayoutWidth", this.handleUpdateLayoutWidth);
  },
  methods: {
    handleDrag(event) {
      const currentPosition = this.getCurrentPosition(event);

      let newPosition = { top: 0, left: 0 };
      switch (event.type) {
        case "dragstart": {
          this.previousX = this.innerX;
          this.previousY = this.innerY;

          newPosition = this.getNewPosition(event);
          this.draggedPosition = newPosition;
          this.isDragging = true;
          break;
        }
        case "dragend": {
          newPosition = this.getNewPosition(event);
          this.isDragging = false;
          this.draggedPosition = null;
          break;
        }
        case "dragmove": {
          let deltaX = currentPosition.x - this.lastX;
          let deltaY = currentPosition.y - this.lastY;

          newPosition.left = this.draggedPosition.left + deltaX;
          newPosition.top = this.draggedPosition.top + deltaY;

          this.draggedPosition = newPosition;
          break;
        }
      }

      this.lastX = currentPosition.x;
      this.lastY = currentPosition.y;

      let x = Math.round(newPosition.left);
      let y = Math.round(newPosition.top);

      EventBus.$emit(
        "dragEvent",
        event,
        this.id,
        x,
        y,
        this.innerWidth,
        this.innerHeight
      );
    },
    handleUpdateLayoutWidth(value) {
      this.layoutWidth = value;
      console.log("Layout width updated: " + this.layoutWidth);
    },
    makeDraggable() {
      const that = this;

      if (this.interactObject === null || this.interactObject === undefined) {
        this.interactObject = interact(this.$refs.item);
      }

      this.interactObject.draggable({});

      this.interactObject.on("dragstart dragmove dragend", function(event) {
        that.handleDrag(event);
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
      const columnWidth = this.calculateColumnWidth();
      //this.innerWidth =
      const translate =
        "translate3d(" + this.innerX + "px," + this.innerY + "px, 0)";
      this.style = {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: this.innerWidth + "px",
        height: this.innerHeight + "px",
        position: "absolute"
      };
    },
    calculateColumnWidth() {
      return this.layoutWidth / this.columnNumber;
    }
  },
  watch: {
    x: function(value) {
      this.innerX = value;
      this.createStyle();
    },
    y: function(value) {
      this.innerY = value;
      this.createStyle();
    },
    width: function(value) {
      this.innerWidth = value;
      this.createStyle();
    },
    height: function(value) {
      this.innerHeight = value;
      this.createStyle();
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
