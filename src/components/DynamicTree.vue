<template>
  <div>
    <template v-if="Array.isArray(model)"> </template>
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
  isNestedObject,
  isSimpleObject,
  isPrimitive
} from '../utils/object-utils';

import DynamicObjectView from '../components/DynamicObjectView';

export default {
  components: { DynamicObjectView },
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
