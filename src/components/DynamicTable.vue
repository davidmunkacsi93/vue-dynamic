<template>
  <md-table v-if="Array.isArray(values) && values.length > 1">
    <draggable v-model="headers" tag="tr">
      <md-table-head v-for="header in headers" :key="header" scope="col">
        {{ header }}
      </md-table-head>
    </draggable>
    <md-table-row v-for="item in values" :key="item.name">
      <md-table-cell v-for="header in headers" :md-label="header" :key="header">
        {{ item[header] }}
      </md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: { draggable },
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
