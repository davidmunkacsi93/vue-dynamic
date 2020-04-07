<template>
  <api-layout
    ref="apiLayout"
    :layout.sync="innerDynamicComponents"
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
    <template v-for="dynamicComponent in innerDynamicComponents">
      <grid-item
        :x="dynamicComponent.x"
        :y="dynamicComponent.y"
        :w="dynamicComponent.w"
        :h="dynamicComponent.h"
        :i="dynamicComponent.i"
        :margin="[3, 3]"
        :rowHeight="30"
        :isDraggable="dynamicComponent.isDraggable"
        :isResizable="dynamicComponent.isResizable"
        :initialized="dynamicComponent.initialized"
        :static="dynamicComponent.static"
        :key="dynamicComponent.i"
        :uuid="dynamicComponent.uuid"
      >
        <dynamic-component
          :type="dynamicComponent.type"
          :baseURL="baseURL"
          :controls="dynamicComponent.controls"
          :description="dynamicComponent.description"
          :httpMethod="dynamicComponent.httpMethod"
          :initialized="dynamicComponent.initialized"
          :path="dynamicComponent.path"
          :uuid="dynamicComponent.uuid"
        >
          <dynamic-form
            v-if="dynamicComponent.type === FORM"
            :type="FORM"
            :baseURL="baseURL"
            :controls="dynamicComponent.controls"
            :description="dynamicComponent.description"
            :httpMethod="dynamicComponent.httpMethod"
            :initialized="dynamicComponent.initialized"
            :path="dynamicComponent.path"
            :uuid="dynamicComponent.uuid"
          ></dynamic-form>
          <dynamic-search-form
            v-else-if="dynamicComponent.type === SEARCH_FORM"
            :type="dynamicComponent.type"
            :baseURL="baseURL"
            :controls="dynamicComponent.controls"
            :description="dynamicComponent.description"
            :httpMethod="dynamicComponent.httpMethod"
            :initialized="dynamicComponent.initialized"
            :path="dynamicComponent.path"
            :uuid="dynamicComponent.uuid"
          ></dynamic-search-form>
        </dynamic-component>
      </grid-item>
    </template>
  </api-layout>
</template>

<script>
import ApiLayout from '../components/ApiLayout';
import GridItem from '../components/GridItem';
import DynamicComponent from '../components/DynamicComponent';
import DynamicForm from '../components/DynamicForm';
import DynamicSearchForm from '../components/DynamicSearchForm';

import ControlRepository from '../repositories/control-repository';

import { FORM, HEADER, SEARCH_FORM } from '../types/layout-item-types';
import { AUTO_SIZE_COMPLETED } from '../types/event-types';
import EventBus from '../utils/event-bus';

export default {
  components: {
    GridItem,
    ApiLayout,
    DynamicComponent,
    DynamicForm,
    DynamicSearchForm
  },
  props: {
    dynamicComponents: {
      required: true,
      type: Array
    },
    baseURL: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      FORM: FORM,
      HEADER: HEADER,
      SEARCH_FORM: SEARCH_FORM,

      innerDynamicComponents: []
    };
  },
  created() {
    this.fetchControlsForDynamicComponents();
    EventBus.$on(AUTO_SIZE_COMPLETED, this.onAutoSizeCompleted);
  },
  beforeDestroy() {
    EventBus.$off(AUTO_SIZE_COMPLETED, this.onAutoSizeCompleted);
  },
  methods: {
    fetchControlsForDynamicComponents(dynamicComponentId) {
      this.dynamicComponents.forEach(async (dynamicComponent) => {
        ControlRepository.getControlsByDynamicComponentId(
          dynamicComponent.id
        ).then((controls) => {
          dynamicComponent.controls = controls;
          this.innerDynamicComponents.push(dynamicComponent);
        });
      });
    },
    onAutoSizeCompleted(payload) {
      var index = this.innerDynamicComponents.findIndex(
        (component) => component.uuid == payload.uuid
      );

      if (!index) return;

      this.innerDynamicComponents[index].x = payload.x;
      this.innerDynamicComponents[index].y = payload.y;
      this.innerDynamicComponents[index].h = payload.h;
      this.innerDynamicComponents[index].w = payload.w;
      this.innerDynamicComponents[index].initialized = true;
      this.innerDynamicComponents[index].static = true;
    }
  }
};
</script>

<style></style>
