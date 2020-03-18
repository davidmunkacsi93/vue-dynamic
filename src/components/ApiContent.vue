<template>
  <grid-layout
    ref="apiLayout"
    :layout="apiLayout"
    :compacted="compacted"
    :col-num="12"
    :rowHeight="30"
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
        :margin="[3, 3]"
        :rowHeight="30"
        :isDraggable="item.isDraggable"
        :isResizable="item.isResizable"
        :initialized="item.initialized"
        :static="item.static"
        :key="item.i"
        :uuid="item.uuid"
      >
        <dynamic-header
          v-if="item.type === HEADER"
          :type="HEADER"
          :apiVersion="item.apiVersion"
          :description="item.description"
          :initialized="item.initialized"
          :title="item.title"
          :uuid="item.uuid"
        ></dynamic-header>
        <dynamic-form
          v-else-if="item.type === FORM"
          :type="FORM"
          :controls="item.controls"
          :description="item.description"
          :httpMethod="item.httpMethod"
          :initialized="item.initialized"
          :path="item.path"
          :uuid="item.uuid"
        ></dynamic-form>
        <dynamic-search-form
          v-else-if="item.type === LIST"
          :type="LIST"
          :controls="item.controls"
          :description="item.description"
          :httpMethod="item.httpMethod"
          :initialized="item.initialized"
          :path="item.path"
          :uuid="item.uuid"
        ></dynamic-search-form>
      </grid-item>
    </template>
  </grid-layout>
</template>
<script>
import {
  LOAD_API_LAYOUT,
  SAVE_API_LAYOUT,
  SET_CONTENT_HEIGHT
} from "../types/action-types";

import GridItem from "../components/GridItem";
import GridLayout from "../components/GridLayout";
import DynamicForm from "../components/DynamicForm";
import DynamicHeader from "../components/DynamicHeader";
import DynamicSearchForm from "../components/DynamicSearchForm";
import { FORM, HEADER, LIST } from "../types/layout-item-types";
import EventBus from "../utils/event-bus";
import {
  DYNAMIC_CONTENT_HEIGHT_UPDATED,
  LAYOUT_UPDATED
} from "../types/event-types";

export default {
  components: {
    GridItem,
    GridLayout,
    DynamicForm,
    DynamicHeader,
    DynamicSearchForm
  },

  data() {
    return {
      currentApiId: 0,
      rowHeight: 30,

      FORM: FORM,
      HEADER: HEADER,
      LIST: LIST,

      apiLayout: [],
      apiModel: {},
      compacted: false
    };
  },
  created() {
    EventBus.$on(LAYOUT_UPDATED, this.setDynamicContentHeight);
  },

  beforeDestroy() {
    EventBus.$off(LAYOUT_UPDATED, this.setDynamicContentHeight);
  },

  mounted() {
    this.setDynamicContentHeight();
  },

  beforeUpdate() {
    this.setDynamicContentHeight();
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.state.apiLayouts.apis) next("/");

      vm.currentApiId = to.params.apiId;
      vm.$store.dispatch(LOAD_API_LAYOUT, vm.currentApiId);
      vm.loadCurrentApiLayout(vm);
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (!this.$store.state.apiLayouts.apis) {
      next("/");
    }

    this.currentApiId = to.params.apiId;
    this.$store.dispatch(SAVE_API_LAYOUT);
    this.$store.dispatch(LOAD_API_LAYOUT, this.currentApiId);
    this.loadCurrentApiLayout(this);
    next();
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SAVE_API_LAYOUT);
    next();
  },

  methods: {
    loadCurrentApiLayout(viewModel) {
      viewModel.apiModel =
        viewModel.$store.state.apiLayouts.apis[
          viewModel.$store.state.apiLayouts.currentApiId
        ];
      viewModel.apiLayout = viewModel.apiModel.apiLayout;
      this.setDynamicContentHeight();
    },

    setDynamicContentHeight() {
      var dynamicContent = this.$parent.$parent.$parent;
      var rowHeight = this.$parent.$parent.$parent.$parent.rowHeight;
      var apiLayoutHeight = this.$refs.apiLayout.$el.clientHeight;
      dynamicContent.innerH = Math.ceil(apiLayoutHeight / rowHeight);

      this.$store.dispatch(SET_CONTENT_HEIGHT, dynamicContent.innerH);
      EventBus.$emit(DYNAMIC_CONTENT_HEIGHT_UPDATED, dynamicContent.innerH);
    }
  }
};
</script>
<style></style>
