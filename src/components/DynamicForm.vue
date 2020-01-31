<template>
  <div v-drag-and-drop:options="dragAndDropOptions">
    <ul class="control-list">
      <li class="control-item">Control 1</li>
      <li class="control-item">Control 2</li>
      <li class="control-item">Control 3</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dragAndDropOptions: {
        dropzoneSelector: "ul",
        draggableSelector: "li",
        handlerSelector: null,
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDrop: function(event) {},
        onDragstart: function(event) {},
        onDragenter: function(event) {},
        onDragover: function(event) {},
        onDragend: function(event) {}
      }
    };
  }
};
</script>
<style>
.control-list {
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.control-item {
  color: white;
  display: block;
  border: 0;
  border-radius: 0;
  background-color: transparent;
}
</style>
