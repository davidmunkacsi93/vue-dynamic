<template>
  <grid-layout
    :layout.sync="layoutItems"
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
    <template v-for="item in layoutItems">
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

export default {
  data() {
    return {
      layoutItems: [],
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
