<template>
  <grid-layout
    ref="apiLayout"
    :layout="apiLayout"
    :col-num="12"
    :rowHeight="rowHeight"
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
        :margin="[15, 15]"
        :rowHeight="rowHeight"
        :isDraggable="item.isDraggable"
        :isResizable="item.isResizable"
        :static="item.static"
        :key="item.i"
        :uuid="item.uuid"
      >
        <dynamic-header
          v-if="item.type === HEADER"
          :type="HEADER"
          :apiVersion="item.apiVersion"
          :description="item.description"
          :title="item.title"
        ></dynamic-header>
        <dynamic-form
          v-else-if="item.type === FORM"
          :type="FORM"
          :controls="item.controls"
          :description="item.description"
          :httpMethod="item.httpMethod"
          :initialized="item.initialized"
          :path="item.path"
        ></dynamic-form>
        <dynamic-list
          v-else-if="item.type === FORM"
          :type="FORM"
          :controls="item.controls"
          :description="item.description"
          :httpMethod="item.httpMethod"
          :initialized="item.initialized"
          :path="item.path"
        ></dynamic-list>
      </grid-item>
    </template>
  </grid-layout>
</template>
<script>
import { v1 as uuid } from "uuid";
import {
  SET_API_LAYOUT_ITEMS,
  LOAD_API_LAYOUT,
  SAVE_API_LAYOUT,
  SET_CONTENT_HEIGHT
} from "../types/action-types";

import DynamicForm from "../components/DynamicForm";
import DynamicHeader from "../components/DynamicHeader";
import DynamicList from "../components/DynamicList";
import { FORM, HEADER, LIST } from "../types/layout-item-types";
import EventBus from "../utils/event-bus";
import {
  DYNAMIC_CONTENT_HEIGHT_UPDATED,
  LAYOUT_UPDATED
} from "../types/event-types";

export default {
  components: { DynamicForm, DynamicHeader, DynamicList },

  data() {
    return {
      currentApiId: 0,
      rowHeight: 30,
      FORM: FORM,
      HEADER: HEADER,
      apiLayout: [],
      apiModel: {}
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
      if (!viewModel.apiLayout || viewModel.apiLayout.length === 0) {
        var defaultLayout = viewModel.getDefaultLayout();
        viewModel.apiModel.apiLayout = defaultLayout;
        viewModel.apiLayout = defaultLayout;
        viewModel.$store.dispatch(SET_API_LAYOUT_ITEMS, viewModel.apiLayout);
        setTimeout(() => {
          this.apiLayout.forEach(layoutItem => {
            layoutItem.static = true;
          });
        }, 200);
      }
      this.setDynamicContentHeight();
    },

    setDynamicContentHeight() {
      var dynamicContent = this.$parent.$parent.$parent;
      var apiLayoutHeight = this.$refs.apiLayout.$el.clientHeight;
      dynamicContent.innerH = Math.ceil(apiLayoutHeight / this.rowHeight);

      this.$store.dispatch(SET_CONTENT_HEIGHT, dynamicContent.innerH);
      EventBus.$emit(DYNAMIC_CONTENT_HEIGHT_UPDATED, dynamicContent.innerH);
    },

    getDefaultLayout() {
      var layout = [];
      var header = this.createHeader();
      layout.push(header);
      this.createDynamicComponents(header).forEach(component =>
        layout.push(component)
      );
      return layout;
    },

    createHeader() {
      return {
        x: 0,
        y: 0,
        w: 12,
        h: 5,
        i: 0,
        uuid: uuid(),
        isDraggable: true,
        isResizable: true,
        static: false,
        apiVersion: this.apiModel.apiVersion,
        description: this.apiModel.description,
        title: this.apiModel.title,
        type: HEADER
      };
    },
    createDynamicComponents() {
      var dynamicComponents = [];

      dynamicComponents.forEach((dynamicComponent, index) => {
        var component = {
          x: (index % 3) * 3,
          y: 5,
          w: 3,
          h: 5,
          i: index + 1,
          uuid: uuid(),
          isDraggable: true,
          isResizable: true,
          static: false,
          type: dynamicComponent.type,
          description: dynamicComponent.description,
          path: dynamicComponent.path,
          httpMethod: dynamicComponent.httpMethod,
          controls: dynamicComponent.controls,
          initialized: false
        };

        if (dynamicComponent.type === LIST) {
          component.searchParameterControls =
            dynamicComponent.searchParameterControls;
          component.listType = dynamicComponent.listType;
        }
        dynamicComponents.push(component);
      });

      return dynamicComponents;
    }
  }
};
</script>
<style></style>
