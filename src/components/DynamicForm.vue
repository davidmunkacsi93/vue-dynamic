<template>
  <dynamic-form-controls
    :class="{ stretch: initialized }"
    :controls="controls"
  ></dynamic-form-controls>
</template>
<script>
import DynamicFormControls from "./DynamicFormControls.vue";

export default {
  components: { DynamicFormControls },
  props: {
    controls: {
      type: Array,
      required: true
    },
    initialized: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style></style>
