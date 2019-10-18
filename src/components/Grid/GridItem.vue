<template>
  <div class="grid-item">
    <slot>Placeholder</slot>
  </div>
</template>

<script>
import {} from "vue-interact";

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
    const self = this;
  },
  methods: {
    handleDrag(event) {
      console.log("Dragging");
      switch (event.type) {
        case "dragstart": {
          console.log("Starting to drag...");
        }
        case "drag": {
          console.log("Dragging..");
        }
        case "dragend": {
          console.log("Ending drag..");
        }
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