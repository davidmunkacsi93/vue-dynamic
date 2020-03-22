<template>
  <md-table>
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
import draggable from "vuedraggable";

export default {
  components: { draggable },
  props: {
    model: {
      type: Object,
      required: false
    },
    values: {
      type: Array,
      required: true
    }
  },
  mounted() {
    if (
      !this.model ||
      !this.model.properties ||
      Object.keys(this.model).length === 0
    ) {
      this.runtimeModel = true;
    } else {
      this.headers = this.model.properties.map(property => property.name);
    }
  },
  data() {
    return {
      headers: [],
      runtimeModel: false
    };
  }
};
</script>

<style></style>
