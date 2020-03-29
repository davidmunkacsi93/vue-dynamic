<template>
  <div>
    <template v-if="Array.isArray(values)"> </template>
    <template v-else-if="isSimpleObject(values)"></template>
    <template v-else-if="isPrimitive(values)"></template>
  </div>
</template>

<script>
import { isSimpleObject, isPrimitive } from '../utils/object-utils';

export default {
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
