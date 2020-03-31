<template>
  <md-list>
    <template v-if="Array.isArray(model)">
      <div @click.stop="toggleOpen()">
        <h4>{{ label }}</h4>
        <dynamic-list
          v-if="arrayHasOnlyPrimitives(model)"
          :model="model"
        ></dynamic-list>
        <dynamic-table
          v-if="arrayHasOnlySingleObjects(model)"
          :model="model"
        ></dynamic-table>
        <template v-if="arrayHasNestedObject(model)">
          <dynamic-tree-view-item
            v-for="objectKey in Object.keys(model)"
            :key="objectKey"
            :label="objectKey"
            :model="model[objectKey]"
            :currentDepth="currentDepth + 1"
          ></dynamic-tree-view-item>
        </template>
      </div>
    </template>
    <template v-if="isNestedObject(model)">
      <div @click.stop="toggleOpen()">
        <dynamic-tree-view-item
          v-for="objectKey in Object.keys(model)"
          :key="objectKey"
          :label="objectKey"
          :model="model[objectKey]"
          :currentDepth="currentDepth + 1"
        ></dynamic-tree-view-item>
      </div>
    </template>
    <template v-if="isSimpleObject(model)">
      <dynamic-object-view :model="model"> </dynamic-object-view>
    </template>
    <template v-if="isPrimitive(model)">
      <div>
        <h4>{{ label }}</h4>
        <span>{{ model }}</span>
      </div>
    </template>
  </md-list>
</template>

<script>
import {
  arrayHasOnlyPrimitives,
  arrayHasOnlySingleObjects,
  arrayHasNestedObject,
  isNestedObject,
  isSimpleObject,
  isPrimitive
} from '../utils/object-utils';

import DynamicList from '../components/DynamicList';
import DynamicObjectView from '../components/DynamicObjectView';
import DynamicTable from '../components/DynamicTable';

export default {
  name: 'dynamic-tree-view-item',
  components: { DynamicList, DynamicObjectView, DynamicTable },
  props: {
    currentDepth: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    model: {
      required: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    },
    arrayHasOnlyPrimitives,
    arrayHasOnlySingleObjects,
    arrayHasNestedObject,
    isNestedObject,
    isSimpleObject,
    isPrimitive
  }
};
</script>

<style></style>
