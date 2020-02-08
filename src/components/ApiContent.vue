<template>
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
        <dynamic-form :type="FORM"></dynamic-form>
      </grid-item>
    </template>
  </grid-layout>
</template>
<script>
import { FORM } from "../types/layout-item-types";
import { mapState } from "vuex";
import { SET_API_LAYOUT_ITEMS } from "../types/action-types";

export default {
  beforeCreate() {
    this.$store.dispatch();
  },
  computed: {
    ...mapState({
      apiLayout: state => state.apiLayouts.currentApiLayout
    }),
    currentApiLayoutItems: {
      get() {
        return this.$store.state.apiLayouts.mainLayoutItems;
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
    console.log(to + " " + from);
    next();
  }
};
</script>
<style></style>
