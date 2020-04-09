<template>
  <md-list class="md-double-line">
    <md-list-item v-for="header in headers" :key="header">
      <div class="md-list-item-text">
        <h4>{{ header }}</h4>
        <span v-if="Array.isArray(model)">{{ model[0][header] }}</span>
        <span v-else>{{ model[header] }}</span>
      </div>
    </md-list-item>
  </md-list>
</template>

<script>
export default {
  props: {
    model: {
      required: true
    }
  },
  data() {
    return {
      headers: []
    };
  },
  beforeMount() {
    this.headers = Object.keys(this.model);
  }
};
</script>

<style></style>
