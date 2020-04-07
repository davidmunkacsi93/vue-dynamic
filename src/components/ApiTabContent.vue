<template>
  <api-layout
    ref="apiLayout"
    :layout.sync="innerApiLayout"
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
    <template v-for="item in innerApiLayout">
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
        <dynamic-component
          :type="item.type"
          :baseURL="baseURL"
          :controls="item.controls"
          :description="item.description"
          :httpMethod="item.httpMethod"
          :initialized="item.initialized"
          :path="item.path"
          :uuid="item.uuid"
        >
          <dynamic-form
            v-if="item.type === FORM"
            :type="FORM"
            :baseURL="baseURL"
            :controls="item.controls"
            :description="item.description"
            :httpMethod="item.httpMethod"
            :initialized="item.initialized"
            :path="item.path"
            :uuid="item.uuid"
          ></dynamic-form>
          <dynamic-search-form
            v-else-if="item.type === SEARCH_FORM"
            :type="item.type"
            :baseURL="baseURL"
            :controls="item.controls"
            :description="item.description"
            :httpMethod="item.httpMethod"
            :initialized="item.initialized"
            :path="item.path"
            :uuid="item.uuid"
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

import { FORM, HEADER, SEARCH_FORM } from '../types/layout-item-types';

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
  mounted() {
    this.innerApiLayout = this.apiLayout;
  }
};
</script>

<style></style>
