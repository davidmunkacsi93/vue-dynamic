<template>
  <div>
    <div @click.stop="toggleOpen()">
      <h4 class="display-inline">{{ title }}</h4>
      <md-icon class="display-inline" v-if="!isOpen">expand_more</md-icon>
      <md-icon class="display-inline" v-if="isOpen">expand_less</md-icon>
    </div>
    <div v-if="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: false,
      type: String
    },
    isExpanded: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isOpen: function () {
      return this.open || this.currentDepth === 0;
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    }
  }
};
</script>

<style>
.display-inline {
  display: inline !important;
}
</style>
