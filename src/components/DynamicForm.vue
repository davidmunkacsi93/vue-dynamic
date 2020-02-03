<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">Form {{ id }}</div>
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
      <md-card-actions>
        <md-button v-show="isEditModeActive" @click="removeGridItem"
          >Remove
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
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
