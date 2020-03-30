<template>
  <div>
    <template v-if="Array.isArray(model)">
      <div @click.stop="toggleOpen()">
        <div v-if="this.isOpen">
          <dynamic-list
            v-if="arrayHasOnlyPrimitives(model)"
            :model="model"
          ></dynamic-list>
          <dynamic-table
            v-else-if="arrayHasOnlySingleObjects(model)"
            :model="model"
          ></dynamic-table>
          <template v-else>
            <span class="md-list-item-text">{{ objectKey }}</span>
            <dynamic-tree
              v-for="objectKey in Object.keys(model)"
              :key="objectKey"
              :model="model[objectKey]"
            ></dynamic-tree>
          </template>
        </div>
      </div>
    </template>
    <template v-else-if="isNestedObject(model)">
      <md-list md-expand>
        <md-list-item v-for="objectKey in Object.keys(model)" :key="objectKey">
          <dynamic-tree :model="model[objectKey]"></dynamic-tree>
        </md-list-item>
      </md-list>
    </template>
    <template v-else-if="isSimpleObject(model)">
      <dynamic-object-view :model="model"> </dynamic-object-view>
    </template>
    <template v-else-if="isPrimitive(model)">
      <div>
        <span>{{ model }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import {
  arrayHasOnlyPrimitives,
  arrayHasOnlySingleObjects,
  isNestedObject,
  isSimpleObject,
  isPrimitive
} from '../utils/object-utils';

import DynamicList from '../components/DynamicList';
import DynamicObjectView from '../components/DynamicObjectView';
import DynamicTable from '../components/DynamicTable';

export default {
  name: 'DynamicTreeViewItem',
  components: { DynamicList, DynamicObjectView, DynamicTable },
  props: {
    currentDepth: {
      type: Number,
      required: true
    },
    model: {
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    arrayHasOnlyPrimitives,
    arrayHasOnlySingleObjects,
    isNestedObject,
    isSimpleObject,
    isPrimitive
  }
};
</script>

<style></style>
