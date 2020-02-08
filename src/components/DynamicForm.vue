<template>
  <md-card ref="dynamicForm" class="dynamic-form">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Form {{ id }}</div>
      </md-card-header-text>
      <md-menu md-size="big" md-direction="bottom-end">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>

        <md-menu-content>
          <md-menu-item @click="removeGridItem">
            <span>Remove</span>
            <md-icon>clear</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-header>

    <md-card-content>
      <draggable
        class="row list-group"
        tag="ul"
        v-model="list"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <transition-group type="transition" :name="'flip-list'">
          <li
            class="list-group-item"
            v-for="element in list"
            :key="element.order"
          >
            <span>Control {{ element.order }}</span>
            <input type="text" class="form-control" />
          </li>
        </transition-group>
      </draggable>
    </md-card-content>
  </md-card>
</template>
<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
import { REMOVE_GRID_ITEM } from "../types/action-types";

const controlList = ["text-box", "text-box", "text-box"];

export default {
  components: {
    draggable
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isEditModeActive: state => state.mainLayout.isEditModeActive
    })
  },
  data() {
    return {
      list: controlList.map((name, index) => {
        return { name, order: index + 1, fixed: false };
      }),
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    removeGridItem() {
      this.$store.dispatch(REMOVE_GRID_ITEM, this.id);
    }
  }
};
</script>
<style>
.dynamic-form {
  height: 100%;
  margin: 0px !important;
}
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
  background: transparent;
  border: none;
}
.list-group-item i {
  cursor: pointer;
}
</style>
