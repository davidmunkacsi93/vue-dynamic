<template>
  <div>
    <h1>{{ apiModel.title }} - {{ apiModel.apiVersion }}</h1>
    <h2 v-if="apiModel.description">{{ apiModel.description }}</h2>
    <grid-layout
      :layout.sync="apiLayout"
      :col-num="12"
      :row-height="30"
      :margin="[3, 3]"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :responsive="true"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <template v-for="item in apiLayout">
        <grid-item
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :isDraggable="item.isDraggable"
          :isResizable="item.isResizable"
          :static="item.static"
          :key="item.id"
        >
          <dynamic-form :type="FORM" :id="item.id"></dynamic-form>
        </grid-item>
      </template>
    </grid-layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  SET_API_LAYOUT_ITEMS,
  LOAD_API_LAYOUT,
  SAVE_API_LAYOUT
} from "../types/action-types";

import DynamicForm from "../components/DynamicForm";

export default {
  components: { DynamicForm },
  computed: {
    ...mapState({
      apiModel: state => state.apiLayouts.currentApiModel
    }),
    apiLayout: {
      get() {
        var currentApiLayout = this.$store.state.apiLayouts.currentApiLayout;
        if (!currentApiLayout || currentApiLayout.length === 0) {
          //this.initializeLayout();
        }
        return currentApiLayout;
      },
      set(layoutItems) {
        this.$store.dispatch(SET_API_LAYOUT_ITEMS, layoutItems);
      }
    }
  },
  data() {
    return {
      currentApiId: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    const nextApiId = to.params.apiId;
    next(vm => {
      vm.$store.dispatch(LOAD_API_LAYOUT, nextApiId);
    });
  },
  beforeRouteUpdate(to, from, next) {
    const nextApiId = to.params.apiId;
    this.$store.dispatch(SAVE_API_LAYOUT);
    this.$store.dispatch(LOAD_API_LAYOUT, nextApiId);
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SAVE_API_LAYOUT);
    next();
  },
  initializeLayout() {
    console.log("Initializing layout...");
  }
};
</script>
<style></style>
