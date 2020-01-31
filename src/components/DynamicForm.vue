<template>
  <draggable
    class="list-group"
    tag="ul"
    v-model="list"
    @start="isDragging = true"
    @end="isDragging = false"
  >
    <transition-group type="transition" :name="'flip-list'">
      <li class="list-group-item" v-for="element in list" :key="element.order">
        <i
          :class="
            element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
          "
          @click="element.fixed = !element.fixed"
          aria-hidden="true"
        ></i>
        {{ element.name }}
        <span class="badge">{{ element.order }}</span>
      </li>
    </transition-group>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

export default {
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      list2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  }
};
</script>
<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
