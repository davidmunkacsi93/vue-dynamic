<template>
  <md-list>
    <md-list-item>
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
          <md-list md-expand>
            <md-list-item
              v-for="objectKey in Object.keys(model)"
              :key="objectKey"
            >
              <span class="md-list-item-text">{{ objectKey }}</span>
              <dynamic-tree :model="model[objectKey]"></dynamic-tree>
            </md-list-item>
          </md-list>
        </template>
      </template>
      <template v-else-if="isNestedObject(model)">
        <md-list md-expand>
          <md-list-item
            v-for="objectKey in Object.keys(model)"
            :key="objectKey"
          >
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
