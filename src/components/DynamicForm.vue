<template>
  <div>
    <div>
      <span>Header</span>
      <button class="fa fa-times pull-right" @click="removeGridItem"></button>
    </div>
    <draggable
      class="col-md-10 list-group"
      tag="ul"
      v-model="list"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="'flip-list'">
        <li class="list-group-item" v-for="element in list" :key="element.order">
          {{ element.name }}
          <span>{{ element.order }}</span>
        </li>
      </transition-group>
    </draggable>
  </div>
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
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    removeGridItem() {
      console.log("Remove grid item...");
    }
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
