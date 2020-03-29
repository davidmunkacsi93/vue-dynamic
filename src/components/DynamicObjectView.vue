<template>
  <md-list class="md-double-line">
    <draggable>
      <md-list-item v-for="header in headers" :key="header">
        <div class="md-list-item-text">
          <span>{{ header }}</span>
          <span v-if="Array.isArray(values)">{{ values[0][header] }}</span>
          <span v-else>{{ values[header] }}</span>
        </div>
      </md-list-item>
    </draggable>
  </md-list>
</template>

<script>
export default {
  props: {
    values: {
      required: true
    }
  },
  data() {
    return {
      headers: []
    };
  },
  watch: {
    values: function (value) {
      this.values = value;
      this.headers = Object.keys(this.values);
    }
  }
};
</script>

<style></style>
