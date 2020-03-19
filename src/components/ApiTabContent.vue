<template>
  <api-layout
    ref="apiLayout"
    :layout="innerApiLayout"
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
        <dynamic-header
          v-if="item.type === HEADER"
          :type="HEADER"
          :baseURL="baseURL"
          :apiVersion="item.apiVersion"
          :description="item.description"
          :initialized="item.initialized"
          :title="item.title"
          :uuid="item.uuid"
        ></dynamic-header>
        <dynamic-form
          v-else-if="item.type === FORM"
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
          v-else-if="
            item.type === LIST ||
              item.type === GRID ||
              item.type === SEARCH_FORM
          "
          :type="LIST"
          :baseURL="baseURL"
          :controls="item.controls"
          :description="item.description"
          :httpMethod="item.httpMethod"
          :initialized="item.initialized"
          :listType="item.listType"
          :path="item.path"
          :uuid="item.uuid"
        ></dynamic-search-form>
      </grid-item>
    </template>
  </api-layout>
</template>

<script>
import ApiLayout from "../components/ApiLayout";
import GridItem from "../components/GridItem";
import DynamicForm from "../components/DynamicForm";
import DynamicHeader from "../components/DynamicHeader";
import DynamicSearchForm from "../components/DynamicSearchForm";

import {
  FORM,
  HEADER,
  LIST,
  GRID,
  SEARCH_FORM
} from "../types/layout-item-types";

export default {
  components: {
    GridItem,
    ApiLayout,
    DynamicForm,
    DynamicHeader,
    DynamicSearchForm
  },
  props: {
    apiLayout: {
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
      GRID: GRID,
      LIST: LIST,
      SEARCH_FORM: SEARCH_FORM,

      innerApiLayout: []
    };
  },
  mounted() {
    this.innerApiLayout = this.apiLayout;
  }
};
</script>

<style></style>
