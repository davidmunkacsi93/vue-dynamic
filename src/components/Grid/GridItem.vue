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
      //style: {}
    };
  },
  mounted: function() {
    this.makeDraggable();
  },
  methods: {
    handleDrag(event) {
      console.log("Dragging");
      switch (event.type) {
        case "dragstart": {
          console.log("Starting to drag...");
          break;
        }
        case "drag": {
          console.log("Dragging..");
          break;
        }
        case "dragend": {
          console.log("Ending drag..");
          break;
        }
      }
    },
    makeDraggable() {
      if (this.interactObject === null || this.interactObject === undefined) {
        this.interactObject = interact(this.$refs.item);
        console.log(this.interactObject);
      }
    }
  }
};
</script>

<style>
.grid-item {
  display: block;
}
</style>
