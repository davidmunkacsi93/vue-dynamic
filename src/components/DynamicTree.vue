<template>
  <div>
    <template v-if="Array.isArray(model)">
      <dynamic-list
        v-if="arrayHasOnlyPrimitives(model)"
        :model="model"
      ></dynamic-list>
      <dynamic-table
        v-else-if="arrayHasOnlySingleObjects(model)"
        :model="model"
      ></dynamic-table>
      <template v-else>
        <dynamic-tree
          v-for="objectKey in Object.keys(model)"
          :key="objectKey"
          :model="model[objectKey]"
        ></dynamic-tree>
      </template>
    </template>
    <template v-else-if="isNestedObject(model)">
      <template v-for="objectKey in Object.keys(model)">
        <dynamic-tree :model="model[objectKey]" :key="objectKey"></dynamic-tree>
      </template>
    </template>
    <template v-else-if="isSimpleObject(model)">
      <dynamic-object-view :model="model"> </dynamic-object-view>
    </template>
    <template v-else-if="isPrimitive(model)">
      <span>{{ model }}</span>
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
  components: { DynamicList, DynamicObjectView, DynamicTable },
  props: {
    model: {
      required: true
    }
  },
  watch: {
    model: function (value) {
      this.model = value;
    }
  }
};
</script>

<style></style>
