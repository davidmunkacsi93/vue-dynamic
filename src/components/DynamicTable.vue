<template>
  <md-table v-if="Array.isArray(model)">
    <draggable v-model="headers" tag="tr">
      <md-table-head v-for="header in headers" :key="header" scope="col">
        {{ header }}
      </md-table-head>
    </draggable>
    <md-table-row v-for="item in model" :key="item.name">
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
    model: {
      required: true
    }
  },
  data() {
    return {
      headers: []
    };
  },
  watch: {
    model: function (value) {
      this.model = value;
      this.headers = Object.keys(this.model);
    }
  }
};
</script>

<style></style>
