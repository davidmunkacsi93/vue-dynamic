<template>
  <md-card ref="dynamicForm" class="dynamic-form" md-with-hover>
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ path }}</div>
        <div class="md-subhead">{{ description }}</div>
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
        <md-list-item v-for="control in controls" :key="control.order">
          <md-field v-if="control.element === INPUT">
            <label>{{ control.label }}</label>
            <md-input v-model="control.value" type="text"></md-input>
          </md-field>
          <md-switch
            v-model="control.value"
            v-else-if="control.element === SWITCH"
            >{{ control.label }}</md-switch
          >
        </md-list-item>
      </md-list>
    </md-card-content>
    <md-card-actions>
      <md-button>Call</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import { mapState } from "vuex";
import { REMOVE_FORM } from "../types/action-types";
import { INPUT, SWITCH } from "../types/layout-item-types";

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    model: {
      type: Object,
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
      path: this.model.path,
      description: this.model.description,
      controls: this.model.controls.map((control, index) => {
        return {
          ...control,
          index
        };
      }),
      INPUT: INPUT,
      SWITCH: SWITCH,
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
