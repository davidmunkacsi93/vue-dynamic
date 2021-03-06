<template>
  <div class="tree-view-item">
    <template v-if="Array.isArray(model)">
      <expand-panel :title="label" :toggleRequired="currentDepth !== 0">
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
      </expand-panel>
    </template>
    <template v-if="isNestedObject(model)">
      <expand-panel :title="label" :toggleRequired="currentDepth !== 0">
        <dynamic-tree-view-item
          v-for="objectKey in Object.keys(model)"
          :key="objectKey"
          :label="objectKey"
          :model="model[objectKey]"
          :currentDepth="currentDepth + 1"
        ></dynamic-tree-view-item>
      </expand-panel>
    </template>
    <template v-if="isSimpleObject(model)">
      <expand-panel :title="label" :toggleRequired="currentDepth !== 0">
        <dynamic-object-view :model="model"> </dynamic-object-view>
      </expand-panel>
    </template>
    <template v-if="isPrimitive(model)">
      <div class="md-list-item-content md-ripple md-disabled no-padding">
        <div class="md-list-item-text">
          <h4>{{ label }}</h4>
          <span class="md-span">{{ model }}</span>
        </div>
      </div>
    </template>
  </div>
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
import ExpandPanel from '../components/ExpandPanel';

export default {
  name: 'dynamic-tree-view-item',
  components: { DynamicList, DynamicObjectView, DynamicTable, ExpandPanel },
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
  methods: {
    arrayHasOnlyPrimitives,
    arrayHasOnlySingleObjects,
    arrayHasNestedObject,
    isNestedObject,
    isSimpleObject,
    isPrimitive
  }
};
</script>

<style scoped>
.tree-view-item {
  margin-left: 10px;
}
.no-padding {
  padding: 0px;
}

.md-span {
  color: rgba(0, 0, 0, 0.54);
}
</style>
