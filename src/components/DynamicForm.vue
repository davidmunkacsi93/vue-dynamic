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
      <md-list class="control-list">
        <md-list-item v-for="element in list" :key="element.order">
          <md-field>
            <label>Control {{ element.order }}</label>
            <md-input></md-input>
          </md-field>
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapState } from "vuex";
import { REMOVE_FORM } from "../types/action-types";

const controlList = ["text-box", "text-box", "text-box"];

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    apiName: {
      type: String,
      required: false
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
      this.$store.dispatch(REMOVE_FORM, this.id);
    }
  }
};
</script>
<style>
.dynamic-form {
  height: 100%;
  margin: 0px !important;
}
.control-list {
  padding: 0;
}
</style>
