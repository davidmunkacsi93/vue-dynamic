<template>
  <md-list md-expand>
    <md-list-item v-for="objectKey in Object.keys(model)" :key="objectKey">
      <template v-if="Array.isArray(model[objectKey])">
        <dynamic-list
          v-if="arrayHasOnlyPrimitives(model[objectKey])"
          :model="model[objectKey]"
        ></dynamic-list>
        <dynamic-table
          v-else-if="arrayHasOnlySingleObjects(model[objectKey])"
          :model="model[objectKey]"
        ></dynamic-table>
        <template v-else>
          <dynamic-tree :model="model[objectKey]"></dynamic-tree>
        </template>
      </template>
      <template v-else-if="isNestedObject(model[objectKey])">
        <dynamic-tree :model="model[objectKey]"></dynamic-tree>
      </template>
      <template v-else-if="isSimpleObject(model[objectKey])">
        <dynamic-object-view :model="model[objectKey]"> </dynamic-object-view>
      </template>
      <template v-else-if="isPrimitive(model[objectKey])">
        <div>
          <h4>{{ objectKey }}</h4>
          <span>{{ model[objectKey] }}</span>
        </div>
      </template>
    </md-list-item>
  </md-list>
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
  name: 'DynamicTree',
  components: { DynamicList, DynamicObjectView, DynamicTable },
  props: {
    model: {
      required: true
    }
  },
  methods: {
    arrayHasOnlyPrimitives,
    arrayHasOnlySingleObjects,
    isNestedObject,
    isSimpleObject,
    isPrimitive
  },
  watch: {
    model: function (value) {
      this.model = value;
      console.log(this.model);
    }
  }
};
</script>

<style></style>
