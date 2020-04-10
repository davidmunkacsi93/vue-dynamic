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
import DynamicComponentRepository from '../repositories/dynamic-component-repository';

import { FORM, HEADER, SEARCH_FORM } from '../types/layout-item-types';
import {
  AUTO_SIZE_COMPLETED,
  COMPACT_COMPLETED,
  COMPACT
} from '../types/event-types';

import {
  DISABLE_EDIT_MODE_API_LAYOUT,
  ENABLE_EDIT_MODE_API_LAYOUT,
  SAVE_API_LAYOUT,
  SET_CONTENT_HEIGHT,
  REMOVE_FORM
} from '../types/action-types';
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
    const self = this;
    self.fetchControlsForDynamicComponents();
    EventBus.$on(AUTO_SIZE_COMPLETED, self.onAutoSizeCompleted);
    EventBus.$on(COMPACT_COMPLETED, self.onCompactCompleted);
    EventBus.$on(DISABLE_EDIT_MODE_API_LAYOUT, self.onEditModeDisabled);
    EventBus.$on(ENABLE_EDIT_MODE_API_LAYOUT, self.onEditModeEnabled);
    EventBus.$on(REMOVE_FORM, self.onRemoveForm);
    EventBus.$on(SAVE_API_LAYOUT, self.onSaveApiLayout);
  },
  beforeDestroy() {
    EventBus.$off(AUTO_SIZE_COMPLETED, this.onAutoSizeCompleted);
    EventBus.$off(COMPACT_COMPLETED, this.onCompactCompleted);
    EventBus.$off(DISABLE_EDIT_MODE_API_LAYOUT, this.onEditModeDisabled);
    EventBus.$off(ENABLE_EDIT_MODE_API_LAYOUT, this.onEditModeEnabled);
    EventBus.$off(REMOVE_FORM, this.onRemoveForm);
    EventBus.$off(SAVE_API_LAYOUT, this.onSaveApiLayout);
  },
  methods: {
    async fetchControlsForDynamicComponents() {
      var result = [];
      const self = this;

      for (var dynamicComponent of self.dynamicComponents) {
        const controls = await ControlRepository.getControlsByDynamicComponentId(
          dynamicComponent.id
        );
        dynamicComponent.controls = controls;
        result.push(dynamicComponent);
      }
      self.innerDynamicComponents = result;
      EventBus.$emit(SET_CONTENT_HEIGHT);
    },

    onAutoSizeCompleted(payload) {
      var index = this.innerDynamicComponents.findIndex(
        (component) => component.uuid == payload.uuid
      );

      if (index < 0) return;

      this.innerDynamicComponents[index].x = payload.x;
      this.innerDynamicComponents[index].y = payload.y;
      this.innerDynamicComponents[index].h = payload.h;
      this.innerDynamicComponents[index].w = payload.w;
      this.innerDynamicComponents[index].initialized = true;
      this.innerDynamicComponents[index].static = true;

      DynamicComponentRepository.updateDynamicComponent(
        this.innerDynamicComponents[index]
      );
    },

    onCompactCompleted(payload) {
      payload.forEach((dynamicComponent) => {
        var index = this.innerDynamicComponents.findIndex(
          (component) => component.uuid == dynamicComponent.uuid
        );

        if (index < 0) return;
        this.innerDynamicComponents[index].x = dynamicComponent.x;
        this.innerDynamicComponents[index].y = dynamicComponent.y;
      });
    },

    onEditModeDisabled() {
      this.innerDynamicComponents.forEach((dynamicComponent) => {
        dynamicComponent.static = true;
      });
    },

    onEditModeEnabled() {
      this.innerDynamicComponents.forEach((dynamicComponent) => {
        dynamicComponent.static = false;
      });
    },

    onRemoveForm(uuid) {
      var componentIndex = this.innerDynamicComponents.findIndex(
        (dynamicComponent) => dynamicComponent.uuid === uuid
      );

      if (componentIndex < 0) return;

      this.innerDynamicComponents.splice(componentIndex, 1);
      DynamicComponentRepository.deleteDynamicComponentByUuid(uuid);
    },

    onSaveApiLayout() {
      DynamicComponentRepository.updateDynamicComponents(
        this.innerDynamicComponents
      );
    }
  },
  watch: {
    dynamicComponents: function (val) {
      this.innerDynamicComponents = val;
    }
  }
};
</script>

<style></style>
