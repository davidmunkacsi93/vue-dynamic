<template>
  <div>
    <template v-if="Array.isArray(values)"> </template>
    <template v-else-if="isNestedObject(values)"> </template>
    <template v-else-if="isSimpleObject(values)">
      <dynamic-object-view :values="values"> </dynamic-object-view>
    </template>
    <template v-else-if="isPrimitive(values)">
      <span>{{ values }}</span>
    </template>
  </div>
</template>

<script>
import { isSimpleObject, isPrimitive } from '../utils/object-utils';

import DynamicObjectView from '../components/DynamicObjectView';

export default {
  components: { DynamicObjectView },
  props: {
    values: {
      required: true
    }
  },
  watch: {
    values: function (value) {
      this.values = value;
    }
  }
};
</script>

<style></style>
