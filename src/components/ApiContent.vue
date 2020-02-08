<template>
  <div>
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
import { FORM } from "../types/layout-item-types";
import { mapState } from "vuex";
import { SET_API_LAYOUT_ITEMS, LOAD_API_LAYOUT } from "../types/action-types";

import DynamicForm from "../components/DynamicForm";

export default {
  components: { DynamicForm },
  computed: {
    ...mapState({
      apiLayout: state => state.apiLayouts.currentApiLayout
    }),
    apiLayout: {
      get() {
        return this.$store.state.apiLayouts.currentApiLayout;
      },
      set(layoutItems) {
        this.$store.dispatch(SET_API_LAYOUT_ITEMS, layoutItems);
      }
    }
  },
  data() {
    return {
      currentApiId: 0,
      FORM: FORM
    };
  },
  beforeRouteUpdate(to, from, next) {
    const nextApiId = to.params.apiId;
    this.$store.dispatch(LOAD_API_LAYOUT, nextApiId);
    next();
  }
};
</script>
<style></style>
